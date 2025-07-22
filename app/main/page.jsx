
"use client";
import { Suspense } from "react";
import React, { useState, useEffect } from "react";
import InputOfMainPage from "@/components/InputOfMainPage";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Fullscreen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Quantitybatch from "../../components/Quantitybatch";
import {
  togglepageLoading,
  setDishName,
  setServings,
} from "../features/groceriesHandeling/groceryNameSlice";
import {
  addGroceries,
  removeGrocery,
  deleteGroceries,
} from "../features/groceriesHandeling/groceriesSlice";
import {
  setrouterUrl,
  toggleBlogIsReady
} from "../features/groceriesHandeling/BlogRedirectSlice"

const Main = () => {

  const params = useSearchParams();
  const mode = params.get("mode");
  const router = useRouter();
  const [InitialpageLoading, setInitialpageLoading] = useState(true)
  const groceries = useSelector((state) => state.groceries);
  const dispatch = useDispatch();
  const groceryInfo = useSelector((state) => state.groceryName);
  const [inputBottomOffset, setInputBottomOffset] = useState(16); // Default bottom-4 (16px)
  const blogReady = useSelector((state) => state.BlogRedirect.BlogIsReady)
  const routerUrl = useSelector((state) => state.BlogRedirect.routerUrl)
  const [isFullscreen, setisFullscreen] = useState(true)
  const handleDelete = (index) => {
    dispatch(removeGrocery(index));
  };

  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all the Groceries?")) {
      dispatch(deleteGroceries());
      dispatch(setDishName(""));
      dispatch(setServings(1));
      toast.success("All groceries deleted!");
    } else {
      toast("You didn't delete anything.");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setInitialpageLoading(false)

    }, 300);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (
        window.visualViewport &&
        window.visualViewport.height < window.innerHeight
      ) {
        const keyboardHeight =
          window.innerHeight - window.visualViewport.height;
        setInputBottomOffset(keyboardHeight + 16);
      } else {
        setInputBottomOffset(16);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
    } else {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      } else {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  if (InitialpageLoading) {
    return <Loader />;
  }

  return (
    <>
     <Suspense fallback={<div>Loading...</div>}>
      <div className="h-[100svh] w-[100vw] flex flex-col">
        <Navbar />

        <div className="w-full max-w-2xl mx-auto px-3 pt-4 flex flex-col flex-1 overflow-hidden">

          {blogReady && isFullscreen &&
            <div className="w-full max-w-2xl mx-auto relative transition-opacity py-4 mb-4 px-6 bg-white dark:bg-zinc-900 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700">
              {/* Dismiss button */}
              <button
                onClick={() => setisFullscreen(false)} // Example action
                className="absolute top-0 right-3 cursor-pointer text-gray-400 hover:text-red-500 transition-colors duration-200"
                aria-label="Dismiss"
              >
                ✕
              </button>

              {/* Content Section */}
              <div className="flex flex-col lg:flex-row items-center lg:justify-between text-center lg:text-left gap-4">
                <div className="flex flex-col items-center lg:items-start">
                  <h1 className="text-3xl font-extrabold text-zinc-800 dark:text-gray-100 mb-2">
                    Open the Recipe
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    You can read about the{" "}
                    <span className="font-semibold text-orange-500">{groceryInfo.DishName}</span>{" "}
                    recipe here.
                  </p>
                </div>

                {/* Open Recipe Button */}
                <button
                  onClick={() => router.push(routerUrl)}
                  disabled={!routerUrl}
                  className={`text-lg font-semibold cursor-pointer px-6 py-3 rounded-xl 
              bg-gradient-to-r from-green-500 to-yellow-500 text-white 
              hover:scale-105 hover:shadow-xl transition-transform duration-300
              ${!routerUrl ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Open Recipe
                </button>

              </div>
            </div>

          }
          {blogReady && !isFullscreen &&
            <div>
              <button
                onClick={() => router.push(`${routerUrl}`)}
                className="text-sm font-semibold cursor-pointer px-1 py-1   flex items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-yellow-500 text-white hover:scale-105 hover:shadow-xl transition-transform duration-300"
              >
                Open Recipe
              </button>
            </div>
          }


          {/* Header with Delete All */}
          <div className="flex justify-between items-center mb-4 flex-shrink-0">
            <h2 className="text-2xl font-bold text-zinc-800 dark:text-white">
              {groceryInfo.DishName === ""
                ? "Your Grocery List"
                : groceryInfo.pageLoading
                  ? `Loading Ingredients of ${groceryInfo.DishName}...` // Added ellipsis for better loading indication
                  : `Ingredients for ${groceryInfo.DishName} for ${groceryInfo.servings} servings.`} :

            </h2>
            {groceries.length > 0 && (
              <div onClick={handleDeleteAll} className="cursor-pointer">
                <Button variant="destructive" className="cursor-pointer">
                  Delete All
                </Button>
              </div>
            )}
          </div>

          {/* Scrollable list container */}
          <div className="flex-1 overflow-hidden">
            <div
              className="h-full overflow-y-auto space-y-3 pr-1 custom-scrollbar"
              style={{
                paddingBottom: `${inputBottomOffset + 120}px`, // Increased padding for input space
              }}
            >
              {!groceryInfo.pageLoading || groceries.length === 0 && (
                <div className="text-center rounded-2xl text-zinc-700 dark:text-zinc-200 w-full h-[200px] flex flex-col items-center justify-center gap-2 mt-3 p-4">
                  <p className="text-xl font-semibold">
                    🛒 No items in your list
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Start by adding a dish or some grocery items!
                  </p>
                </div>
              )}

              {groceryInfo.pageLoading && (
                <div className="fixed inset-0 flex items-center  m-auto bg-zinc-50 dark:bg-zinc-950    justify-center transition-colors duration-300">
                  <div className=" loader"></div>
                </div>
              )}

              {!groceryInfo.pageLoading && groceries.length > 0 &&
                groceries.map((grocery, index) => (
                  <div
                    key={index}
                    className="
                      flex items-center justify-between
                      px-4 py-2.5                 
                      bg-white dark:bg-zinc-900/60 
                      rounded-md                 
                      transition-colors duration-200
                      hover:bg-zinc-50 dark:hover:bg-zinc-800 
                      mb-2.5    
                      border border-zinc-800 dark:border-zinc-100
                      last:mb-30
                    "
                  >
                    <div className="flex flex-1 items-center flex-wrap gap-x-2 gap-y-1">
                      {/* Ingredient Name */}
                      <span className="font-medium text-xl text-green-500 capitalize flex-shrink-0">
                        {grocery.item}
                      </span>
                      {/* Separator Dot */}
                      <span className="text-zinc-500 text-lg font-extrabold flex-shrink-0">
                        ·
                      </span>
                      {/* Common Quantity */}
                      <span className="text-zinc-700 dark:text-zinc-300 text-lg flex-shrink-0">
                        {grocery.quantity}
                      </span>
                      {/* Quantitybatch */}
                      <Quantitybatch grocery={grocery} />
                    </div>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(index)}
                      className="
                        ml-auto
                        text-destructive/90 hover:text-red-700
                        p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700
                        transition-colors duration-200
                        flex-shrink-0
                      "
                      title="Delete item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <InputOfMainPage mode={mode} inputBottomOffset={inputBottomOffset} />
      </div>
    
    </Suspense></>
  );
};

export default Main;

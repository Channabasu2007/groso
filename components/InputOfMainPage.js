"use client";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  addGroceries,
  updateGroceries,
  deleteGroceries,
} from "../app/features/groceriesHandeling/groceriesSlice";
import {
  setBlogReady,
  setrouterUrl,
} from "../app/features/groceriesHandeling/BlogRedirectSlice";
import toast from "react-hot-toast";
import InputLoader from "@/components/InputLoader"; // This might be redundant if you're using a single loader
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  togglepageLoading,
  setDishName,
  setServings,
} from "../app/features/groceriesHandeling/groceryNameSlice";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const languages = [
  { value: "Afrikaans", label: "Afrikaans" },
  { value: "Albanian", label: "Albanian" },
  { value: "Amharic", label: "Amharic" },
  { value: "Arabic", label: "Arabic" },
  { value: "Armenian", label: "Armenian" },
  { value: "Azerbaijani", label: "Azerbaijani" },
  { value: "Basque", label: "Basque" },
  { value: "Belarusian", label: "Belarusian" },
  { value: "Bengali", label: "Bengali" },
  { value: "Bosnian", label: "Bosnian" },
  { value: "Bulgarian", label: "Bulgarian" },
  { value: "Catalan", label: "Catalan" },
  { value: "Cebuano", label: "Cebuano" },
  { value: "Chinese (Simplified)", label: "Chinese (Simplified)" },
  { value: "Chinese (Traditional)", label: "Chinese (Traditional)" },
  { value: "Corsican", label: "Corsican" },
  { value: "Croatian", label: "Croatian" },
  { value: "Czech", label: "Czech" },
  { value: "Danish", label: "Danish" },
  { value: "Dutch", label: "Dutch" },
  { value: "English", label: "English" },
  { value: "Esperanto", label: "Esperanto" },
  { value: "Estonian", label: "Estonian" },
  { value: "Finnish", label: "Finnish" },
  { value: "French", label: "French" },
  { value: "Frisian", label: "Frisian" },
  { value: "Galician", label: "Galician" },
  { value: "Georgian", label: "Georgian" },
  { value: "German", label: "German" },
  { value: "Greek", label: "Greek" },
  { value: "Gujarati", label: "Gujarati" },
  { value: "Haitian Creole", label: "Haitian Creole" },
  { value: "Hausa", label: "Hausa" },
  { value: "Hawaiian", label: "Hawaiian" },
  { value: "Hebrew", label: "Hebrew" },
  { value: "Hindi", label: "Hindi" },
  { value: "Hmong", label: "Hmong" },
  { value: "Hungarian", label: "Hungarian" },
  { value: "Icelandic", label: "Icelandic" },
  { value: "Igbo", label: "Igbo" },
  { value: "Indonesian", label: "Indonesian" },
  { value: "Irish", label: "Irish" },
  { value: "Italian", label: "Italian" },
  { value: "Japanese", label: "Japanese" },
  { value: "Javanese", label: "Javanese" },
  { value: "Kannada", label: "Kannada" },
  { value: "Kazakh", label: "Kazakh" },
  { value: "Khmer", label: "Khmer" },
  { value: "Korean", label: "Korean" },
  { value: "Kurdish", label: "Kurdish" },
  { value: "Kyrgyz", label: "Kyrgyz" },
  { value: "Lao", label: "Lao" },
  { value: "Latin", label: "Latin" },
  { value: "Latvian", label: "Latvian" },
  { value: "Lithuanian", label: "Lithuanian" },
  { value: "Luxembourgish", label: "Luxembourgish" },
  { value: "Macedonian", label: "Macedonian" },
  { value: "Malagasy", label: "Malagasy" },
  { value: "Malay", label: "Malay" },
  { value: "Malayalam", label: "Malayalam" },
  { value: "Maltese", label: "Maltese" },
  { value: "Maori", label: "Maori" },
  { value: "Marathi", label: "Marathi" },
  { value: "Mongolian", label: "Mongolian" },
  { value: "Myanmar (Burmese)", label: "Myanmar (Burmese)" },
  { value: "Nepali", label: "Nepali" },
  { value: "Norwegian", label: "Norwegian" },
  { value: "Nyanja", label: "Nyanja" },
  { value: "Odia (Oriya)", label: "Odia (Oriya)" },
  { value: "Pashto", label: "Pashto" },
  { value: "Persian", label: "Persian" },
  { value: "Polish", label: "Polish" },
  { value: "Portuguese", label: "Portuguese" },
  { value: "Punjabi", label: "Punjabi" },
  { value: "Romanian", label: "Romanian" },
  { value: "Russian", label: "Russian" },
  { value: "Samoan", label: "Samoan" },
  { value: "Scots Gaelic", label: "Scots Gaelic" },
  { value: "Serbian", label: "Serbian" },
  { value: "Sesotho", label: "Sesotho" },
  { value: "Shona", label: "Shona" },
  { value: "Sindhi", label: "Sindhi" },
  { value: "Sinhala", label: "Sinhala" },
  { value: "Slovak", label: "Slovak" },
  { value: "Slovenian", label: "Slovenian" },
  { value: "Somali", label: "Somali" },
  { value: "Spanish", label: "Spanish" },
  { value: "Sundanese", label: "Sundanese" },
  { value: "Swahili", label: "Swahili" },
  { value: "Swedish", label: "Swedish" },
  { value: "Tagalog", label: "Tagalog" },
  { value: "Tajik", label: "Tajik" },
  { value: "Tamil", label: "Tamil" },
  { value: "Tatar", label: "Tatar" },
  { value: "Telugu", label: "Telugu" },
  { value: "Thai", label: "Thai" },
  { value: "Turkish", label: "Turkish" },
  { value: "Turkmen", label: "Turkmen" },
  { value: "Ukrainian", label: "Ukrainian" },
  { value: "Urdu", label: "Urdu" },
  { value: "Uyghur", label: "Uyghur" },
  { value: "Uzbek", label: "Uzbek" },
  { value: "Vietnamese", label: "Vietnamese" },
  { value: "Welsh", label: "Welsh" },
  { value: "Xhosa", label: "Xhosa" },
  { value: "Yiddish", label: "Yiddish" },
  { value: "Yoruba", label: "Yoruba" },
  { value: "Zulu", label: "Zulu" },
];

function InputOfMainPage({ mode, inputBottomOffset }) {
  const [groceryMode, setgroceryMode] = useState(false);
  const [DishInput, setDishInput] = useState("");
  const [servings, setservings] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [LangBtn, setLangBtn] = useState(false);
  const [translations, setTranslations] = useState(0); // Renamed for clarity and consistency
  const [DishForAi, setDishForAi] = useState("");
  const [GotEverything, setGotEverything] = useState(false);
  const [item, setitem] = useState("");
  const [quantity, setquantity] = useState("");
  const [unit, setunit] = useState("kg");

  const groceries = useSelector((state) => state.groceries);
  const dispatch = useDispatch();

  const router = useRouter();
  const pageloading = useSelector((state) => state.groceryName.pageLoading);

  const dishNameFromRedux = useSelector((state) => state.groceryName.DishName);
  useEffect(() => {
    setgroceryMode(mode === "grocery");
  }, [mode]);

  function isYouTubeLink(input) {
    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)(\/|$)/i.test(
      input.trim()
    );
  }

 const sendList = async () => {
  if (!groceryMode) {
    if (!DishInput || servings <= 0) {
      let msg = "";
      if (DishInput.trim() === "") {
        msg = "You forgot to add the name of the Dish.";
      } else if (servings <= 0) {
        msg = "Please add how many servings you want (must be greater than 0).";
      }
      toast.error(msg);
      return;
    }

    if (groceries.length > 0) {
      if (
        window.confirm("To Get New Ingredients the present list will be deleted.")
      ) {
        dispatch(deleteGroceries());
        toast.success("New Ingredients are coming!");
      } else return;
    }

    let _finalDishName = "";
    let _finalGroceries = [];
    let _dataAcquisitionSuccessful = false;
    setGotEverything(false);

    // Show loading only for ingredient fetching
    dispatch(togglepageLoading(true));

    if (!isYouTubeLink(DishInput)) {
      _finalDishName = DishInput;
      setDishForAi(DishInput);
      dispatch(setDishName(DishInput));
      dispatch(setServings(servings));
      setTranslations(0);

      try {
        const response = await fetch("api/get-ingredients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dishName: DishInput, servings }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error ||
              "Something went wrong fetching ingredients from the server."
          );
        }

        const data = await response.json();
        if (data.ingredients?.length > 0) {
          const fetchedIngredients = data.ingredients.map((item) => ({
            item: item.name,
            quantity: String(item.quantity),
            unit: item.unit,
          }));

          dispatch(addGroceries(fetchedIngredients));
          _finalGroceries = fetchedIngredients;
          _dataAcquisitionSuccessful = true;

          toast.success(
            `Ingredients for "${DishInput}" (${servings} servings) added to list!`
          );
          setDishInput("");
          setservings(1);
        } else {
          toast.error("No ingredients found for this dish. Please try another name.");
        }
      } catch (error) {
        console.error("Failed to fetch ingredients:", error);
        toast.error(error.message || "Failed to get ingredients. Please try again.");
      } finally {
        dispatch(togglepageLoading(false));
      }
    } else {
      // YouTube Flow
      try {
        const response = await fetch("/api/youtubeTranscripter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ DishInput }),
        });

        const data = await response.json();
        if (!response.ok) {
          toast.error("No captions found for this video.");
          dispatch(togglepageLoading(false));
          return;
        }

        let script = Array.isArray(data.content)
          ? data.content.map((item) => item.text).join(" ")
          : data.content;

        if (!script) {
          toast.error("Failed to process video content.");
          dispatch(togglepageLoading(false));
          return;
        }

        const ask = await fetch("/api/YT-ingridients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ script, servings }),
        });

        if (!ask.ok) {
          toast.error((await ask.json()).error || "Failed to fetch ingredients.");
          dispatch(togglepageLoading(false));
          return;
        }

        const details = await ask.json();
        _finalDishName = details.DishName;
        setDishForAi(details.DishName);
        dispatch(setDishName(details.DishName));
        dispatch(setServings(details.servings));

        if (details.ingredients?.length > 0) {
          const fetchedIngredientsFromYT = details.ingredients.map((item) => ({
            item: item.name,
            quantity: String(item.quantity),
            unit: item.unit,
          }));

          dispatch(addGroceries(fetchedIngredientsFromYT));
          _finalGroceries = fetchedIngredientsFromYT;
          _dataAcquisitionSuccessful = true;

          toast.success(`Ingredients for "${details.DishName}" added to list!`);
          setDishInput("");
          setservings(1);
        } else {
          toast.error("No ingredients found for this Video. Please try another Link.");
        }
      } catch (err) {
        console.error("Error fetching transcript or ingredients:", err);
        toast.error("Network error or issue with video processing. Please try again.");
      } finally {
        dispatch(togglepageLoading(false));
      }
    }

    // Call blog generation silently (no loading toggle)
    if (_dataAcquisitionSuccessful) {
      setGotEverything(true);
      try {
        const newBlog = await fetch("/api/NewDishGenerator", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ groceries: _finalGroceries, dishName: _finalDishName }),
        });
        const text = await newBlog.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          console.error("Non-JSON response for NewDishGenerator:", text);
          throw new Error("Unexpected server response for blog generation.");
        }

        if (!newBlog.ok) throw new Error(data.error || "Failed to generate dish.");

        const dishNameSlug = data.slug;
        if (!dishNameSlug) throw new Error("Dish name slug missing in server response.");

        const newBlogUrl = `/blogpost/${encodeURIComponent(dishNameSlug)}`;
        dispatch(setrouterUrl(newBlogUrl));
        toast.success("Blog post generated!");
      } catch (error) {
        console.error("Blog generation error:", error);
        toast.error(error.message || "Something went wrong!");
      } finally {
        dispatch(setBlogReady(true));
        setGotEverything(false);
      }
    } else {
      setGotEverything(false);
      dispatch(setBlogReady(false));
    }
  }

  // Grocery Mode
  if (groceryMode) {
    if (item.trim() && quantity.trim()) {
      dispatch(togglepageLoading(true));
      dispatch(
        addGroceries({ item: item.trim(), unit: quantity.trim() + unit })
      );
      setitem("");
      setquantity("");
      dispatch(togglepageLoading(false));
      setTranslations(0);
      toast.success("Item added to grocery list!");
    } else {
      toast.error(item.trim() === "" ? "You forgot to add the name of the item." : "Please add the desired quantity.");
    }
  }
};

  const searchDish = async () => {
    if (groceries.length === 0) {
      toast.error("Please add some items to your grocery list first.");
      return;
    }

    console.log("Groceries:", groceries);

    try {
      dispatch(togglepageLoading(true));

      const res = await fetch("/api/NewDishGenerator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groceries, dishName: null }),
      });

      const text = await res.text(); // Fetch raw response
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Non-JSON response:", text);
        throw new Error("Unexpected server response");
      }

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate dish.");
      }

      const dishName = data.slug;
      if (!dishName) {
        throw new Error("Dish name missing in server response.");
      }

      router.push(`/blogpost/${encodeURIComponent(dishName)}`);
    } catch (error) {
      console.error("SearchDish error:", error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      dispatch(togglepageLoading(false));
    }
  };


  const selectedLabel = value
    ? languages.find((lang) => lang.value === value)?.label
    : "English";

  const handleSelect = async (currentValue) => {
    // Check if there are any groceries to translate
    if (groceries.length === 0) {
      toast.error("Your grocery list is empty. Add items before translating.");
      return;
    }

    // You now have `translations` as a state variable
    if (translations >= 2) {
      // Changed limit to 2 as per your toast message
      toast.error(
        "You have used translation two times for this list. Further translations are not allowed."
      );
      return;
    }

    const newLang = currentValue === value ? "" : currentValue;

    // If the user selects the currently selected language, effectively "unselect" it
    if (newLang === "") {
      setValue(""); // Reset language
      setOpen(false);
      setLangBtn(false);
      toast("Language selection cleared.");
      return; // Stop here if language is unselected
    }

    setValue(newLang);
    setOpen(false);
    setLangBtn(false);

    dispatch(togglepageLoading(true));
    try {
      const ingredients = groceries.map((grocery) => grocery.item); // Extracts original item names

      const response = await fetch("/api/translator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lang: newLang,
          ingredients,
        }),
      });

      // Crucial: Check if the API response itself was successful (HTTP status 2xx)
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})); // Attempt to parse server error message
        throw new Error(
          errorData.error ||
            "Server responded with an error during translation."
        );
      }

      const translated = await response.json(); // This will be your array of translated strings

      // Ensure 'translated' is an array, not empty, and matches the original list's length
      if (
        translated &&
        Array.isArray(translated) &&
        translated.length === groceries.length
      ) {
        const translatedIngredients = groceries.map((grocery, index) => ({
          ...grocery, // Copy all existing properties (quantity, unit, etc.)
          item: translated[index], // Overwrite the 'item' property with the translation
        }));

        dispatch(updateGroceries(translatedIngredients));
        setTranslations((prev) => prev + 1);
        toast.success(`Groceries translated to ${newLang}!`);
      } else {
        toast.error("Translation failed or result mismatch. Please try again.");
      }
    } catch (error) {
      console.error("Translation error:", error); // Log the error for debugging
      toast.error(error.message || "Failed to translate. Please try again."); // User-friendly error message
    } finally {
      dispatch(togglepageLoading(false));
    }
  };

  return (
    <>
      <div
        className="w-full flex-1 flex justify-center fixed z-50 px-4"
        style={{ bottom: `${inputBottomOffset}px` }}
      >
        <div className="w-full max-w-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-zinc-300 dark:border-zinc-700 rounded-xl p-4 shadow-2xl flex flex-col gap-4 transition-colors duration-800 relative">
          {/* Mobile Language Badge */}
          <div
            onClick={() => setLangBtn(!LangBtn)}
            className="absolute -top-4 left-4 sm:hidden z-[60] cursor-pointer pointer-events-auto"
          >
            <Badge
              variant="secondary"
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 transition-colors"
            >
              Language
            </Badge>
          </div>

          {/* Mobile Language Dropdown */}
          {LangBtn && (
            <div className="absolute -top-25 left-0 right-0 z-[70] sm:hidden">
              <div className="bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg shadow-lg mx-4 mt-8">
                <div className="p-2 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Select Language
                  </span>
                  <button
                    onClick={() => setLangBtn(false)}
                    className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  <Command className="border-0">
                    <CommandInput
                      placeholder="Search language..."
                      className="h-9 text-sm"
                    />
                    <CommandList>
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        {languages.map((lang) => (
                          <CommandItem
                            key={lang.value}
                            value={lang.value}
                            onSelect={handleSelect}
                            className="cursor-pointer"
                          >
                            {lang.label}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                value === lang.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </div>
              </div>
            </div>
          )}

          {!groceryMode ? (
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <textarea
                disabled={pageloading}
                placeholder="Type the dish name or paste a YouTube link..."
                className="flex-1 w-full min-h-[34px] max-h-[100px] p-3 bg-white/90 dark:bg-zinc-800/80 text-black dark:text-white border border-zinc-200 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 transition resize-none"
                value={DishInput}
                onChange={(e) => setDishInput(e.target.value)}
              />

              <div className="w-full sm:w-auto">
                <div className="relative">
                  <select
                    disabled={pageloading}
                    onChange={(e) => setservings(Number(e.target.value))}
                    className="w-full sm:w-[90px] appearance-none px-3 py-2 cursor-pointer pr-8 text-sm rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-white border border-zinc-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  >
                    <option value="1">Serve</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-zinc-500 dark:text-zinc-400">
                    ▼
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <input
                disabled={pageloading}
                type="text"
                value={item}
                onChange={(e) => setitem(e.target.value)}
                placeholder="Enter the grocery item..."
                className="flex-1 p-3 bg-white/90 dark:bg-zinc-800/80 text-black dark:text-white border border-zinc-200 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 transition"
              />
              <div className="w-full sm:w-1/2 flex items-center justify-center">
                <input
                  disabled={pageloading}
                  value={quantity}
                  type={unit === "" ? "text" : "number"}
                  min="0"
                  onChange={(e) => setquantity(e.target.value)}
                  placeholder="Quantity (e.g., 500 or 5 and choose the unit in options)"
                  className="flex-1 w-6/10 p-3 bg-white/90 dark:bg-zinc-800/80 text-black dark:text-white border border-zinc-200 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 transition"
                />
                <select
                  disabled={pageloading}
                  value={unit}
                  onChange={(e) => setunit(e.target.value)}
                  className="w-2/10 ml-1 text-sm bg-zinc-100 overflow-auto cursor-pointer dark:bg-zinc-800 text-zinc-800 dark:text-white border border-zinc-300 dark:border-zinc-600 py-2 rounded-md transition-all"
                >
                  <option value="">custom</option>
                  <option value="kg">kg</option>
                  <option value="g">grams</option>
                  <option value="mg">mg</option>
                  <option value="lb">lb</option>
                  <option value="oz">oz</option>
                  <option value="ml">ml</option>
                  <option value="liter">liter</option>
                  <option value="cup">cup</option>
                  <option value="tbsp">tbsp</option>
                  <option value="tsp">tsp</option>
                  <option value="piece">piece</option>
                  <option value="dozen">dozen</option>
                  <option value="slice">slice</option>
                  <option value="clove">clove</option>
                  <option value="packet">packet</option>
                  <option value="bottle">bottle</option>
                  <option value="can">can</option>
                  <option value="pinch">pinch</option>
                  <option value="drop">drop</option>
                  <option value="taste">to taste</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex flex-wrap justify-between  items-center gap-3">
            <div className="flex gap-2">
              <div
                disabled={pageloading}
                className="flex items-center gap-2 disabled:cursor-not-allowed"
              >
                {!groceryMode ? (
                  <div className="flex rounded-lg overflow-hidden border duration-1000 border-zinc-300 dark:border-white/20 shadow-md text-black dark:text-white font-semibold">
                    <button className="w-7 h-10 bg-green-600 dark:bg-green-500 text-white flex items-center justify-center">
                      D
                    </button>
                    <button
                      onClick={() => setgroceryMode(true)}
                      className="w-30 h-10 bg-yellow-400 cursor-pointer dark:bg-yellow-500 hover:bg-yellow-300 dark:hover:bg-yellow-400 transition"
                    >
                      Grocery Mode
                    </button>
                  </div>
                ) : (
                  <div className="flex rounded-lg overflow-hidden border duration-1000 border-zinc-300 dark:border-white/20 shadow-md text-black dark:text-white font-semibold">
                    <button
                      onClick={() => setgroceryMode(false)}
                      className="w-30 h-10 cursor-pointer bg-green-400 dark:bg-green-500 hover:bg-green-300 dark:hover:bg-green-400 transition"
                    >
                      Dish to Grocery
                    </button>
                    <button className="w-7 h-10 bg-yellow-500 text-white flex items-center justify-center">
                      G
                    </button>
                  </div>
                )}
              </div>

              {/* Desktop Language Selector */}
              <div
                disabled={pageloading}
                className="hidden sm:block disabled:cursor-not-allowed"
              >
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[130px] sm:w-[200px] justify-between"
                    >
                      {selectedLabel}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[130px] sm:w-[200px] p-0 max-h-[300px] overflow-y-auto z-[60]">
                    <Command>
                      <CommandInput
                        placeholder="Search language..."
                        className="h-9 placeholder:text-sm placeholder:hidden placeholder:sm:block"
                      />
                      <CommandList>
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                          {languages.map((lang) => (
                            <CommandItem
                              key={lang.value}
                              value={lang.value}
                              onSelect={handleSelect}
                            >
                              {lang.label}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  value === lang.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {pageloading && (
              <button
                disabled={pageloading}
                onClick={sendList}
                className={`px-5 py-2 cursor-pointer disabled:cursor-not-allowed rounded-lg font-semibold shadow-md active:scale-95 transition-all ${
                  groceryMode
                    ? "bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-500"
                    : "bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-500"
                } text-white`}
              >
                <InputLoader />
              </button>
            )}
            {!pageloading && !groceryMode && (
              <button
                disabled={pageloading}
                onClick={sendList}
                className={`px-5 py-2 cursor-pointer disabled:cursor-not-allowed rounded-lg font-semibold shadow-md active:scale-95 transition-all ${
                  groceryMode
                    ? "bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-500"
                    : "bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-500"
                } text-white`}
              >
                Search
              </button>
            )}

            {!pageloading && groceryMode && (
              <div className="flex gap-1 ">
                <button
                  disabled={pageloading}
                  onClick={sendList}
                  className="px-5 py-2 cursor-pointer disabled:cursor-not-allowed rounded-lg font-semibold shadow-md active:scale-95 transition-all bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-500"
                >
                  Add
                </button>
                <button
                  disabled={pageloading}
                  onClick={searchDish}
                  className="px-5 py-2 cursor-pointer disabled:cursor-not-allowed rounded-lg font-semibold shadow-md active:scale-95 transition-all bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-500"
                >
                  Create
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default InputOfMainPage;

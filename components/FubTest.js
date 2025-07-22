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

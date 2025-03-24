import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import CategoryFilter from '../../components/CategoryFilter';
import MenuCard from '../../components/MenuCard';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../Redux/api/productsApi';
import OfferBanner from '../../components/OfferBanner';
import Loading from '../../components/Loading'; // Import Loading component

import BreakfastBg from "../../images/BreakfastBg.jpg";
import Coffee from "../../images/coffeeBg.jpg";
import { useTranslation } from 'react-i18next';

const Menu = () => {
  const { t } = useTranslation();

  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all"); // Default to "all"
  const categories = [
    { key: "Arabic Sweet", label: t("ArabicSweet") },
    { key: "Western Sweet", label: t("WesternSweet") },
    { key: "Ice Cream", label: t("IceCream") },
    { key: "Hot Drinks", label: t("HotDrinks") },
    { key: "Pastery", label: t("Pastery") },
    
  ];
  let [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const { data, isLoading } = useGetProductsQuery({ keyword });

  useEffect(() => {
    if (data?.products) {
      let filtered = data.products;
      if (selectedCategory !== "all") {
        filtered = filtered.filter(item => item.category === selectedCategory);
      }
      setFilteredItems(filtered);
    }
  }, [data, selectedCategory]);

  return (
    <div className="min-h-screen max-w-full bg-gray-50 overflow-x-hidden mb-20">
      <Navbar />
      <CategoryFilter categories={categories} onSelectCategory={setSelectedCategory} />

      <main className="w-full mx-auto px-4 py-6">
        {selectedCategory === "all" && (
          <>
            <div className="heading text-center">{t("header")}</div>

            <div className="offerBanner mt-4 mb-9">
              <OfferBanner offerHeading={t("AnotherTaste")} offer={t("subBanner_first")} bg={Coffee} />
            </div>

            <div className="offerBanner mt-4 mb-9">
              <OfferBanner offerHeading={t("BreakFast")} offer={t("subBanner_second")} bg={BreakfastBg} />
            </div>
          </>
        )}

        {selectedCategory !== "all" && (
          <div className="heading text-center mb-4">{t(selectedCategory.replace(" ", ""))}</div>
        )}

        {/* Show Loading Component While Fetching Data */}
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.length === 0 ? (
              <p>{t("NoProducts")}</p>
            ) : (
              filteredItems.map((item) => <MenuCard key={item.id} item={item} />)
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Menu;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to our website!',
      hello: 'Hello, World!',
      header:'Our Latest Products',
      NoProducts: 'No Products',
      HotDrinks: 'Hot Drinks',
      IceCream: 'Ice Cream',
      WesternSweet: 'Westeren Sweet',
      ArabicSweet: 'Arabic Sweet',
      All: 'All',
      AnotherTaste: 'Another Taste !',
      subBanner_first:'checkout our new hot drinks menu',
       BreakFast: 'Breakfast ',
      subBanner_second:'a meal with whom we love',
      SignIn:'Sign In Into Your Account',
      email:'Your email',
      password: 'Password',
      RememberMe: 'Rememeber Me',
      ForgotPassword: 'ForgotPassword?',
      SignInBtn:'Sign In',
      Problem: 'Having a problem ? Contact Customer Service',
      UpdateProduct:'Update Product',
      SelectProduct: 'Select Product',
      SelectAProduct: 'Select A Product',
      ProductName: 'Product Name',
      TypePName: 'Type Product Name',
      Price: 'Price',
      Currency: 'SYP',
      Category: 'Category',
      SelectCategory: 'SelectCategory',
      UpdateProduct:'Update Product',
      DeleteProduct:'Delete Product',
      AddProduct:'Add A Product',
      Description:'Description',
      Orders:"Orders",
      NoOrders:"No Orders Avaliable",
      Table:"Table",
      Confirm:"Confirm",
      About:"We are a team of young Syrians dedicated to merging technology with tradition to enhance hospitality in Syria. Hayak offers modern digital solutions like QR code menus for restaurants and cafes, helping to improve efficiency and accessibility while supporting the growth of the tourism and hospitality sector.",
WhoWeAre: "About Us",
Team: "Our Team",
AhmedA: "Eng.Ahmed Al-Ali",
Developer: "Software Engineer",
AhmedLoc:"Istanbul, Turkey",
WardKh:"Eng.Ward Khalaf",
Marketing: "Computer Engineer & Marketing",
WardLoc: "Damascus, Syria",
AhmedS: "Eng.Ahmed Sibai",
AhmedJob: "Social Media & Marketing",
AhmedSLoc: "Homs, Syria",
AboutUs: "About Us",
TableNo: "Enter Table No:",
Seraj: "Seraj Hariri",
Sloc:"Saudi Arabia",
Sjob:"Marketing & Customer Service Dep. Manager"
    },
  },
  ar: {
    translation: {
      welcome: 'مرحبًا بكم في موقعنا!',
      hello: 'مرحبًا بالعالم!',
       header:'آخر منتاجتنا',
       NoProducts: 'لم يتم العثور علي منتجات',
       HotDrinks: 'المشروبات الساخنة',
       IceCream: 'آيس سكريم',
       WesternSweet: 'حلويات غربية',
       ArabicSweet: 'حلويات عربية',
       All: 'الكل',
       AnotherTaste: 'طعم آخر ! ',
      subBanner_first:'اطلعوا على جديد مشروباتنا الساخنة',
             BreakFast: 'النكهة السورية',
      subBanner_second:' ما بتحلى إلا مع الي بنحبن ',
      SignIn:'تسجيل دخول إلى حسابك',
      email:'بريدك الإلكتروني',
      password: 'كلمة السر',
      RememberMe: ' تذكرني',
      ForgotPassword: 'نسيت كلمة المرور ؟',
      SignInBtn:'تسجيل دخول',
      Problem: 'لديك مشكلة في تسجيل الدخول ؟ تواصل مع خدمة العملاء',
      UpdateProduct:'تحديث المنتجات',
      SelectProduct: 'إختر منتج',
      SelectAProduct: 'المنتج',
      ProductName: 'إسم المنتج',
      TypePName: 'اكتب اسم المنتج',
      Price: 'السعر',
      Currency: 'ل س ',
      Category: 'الصنف',
      SelectCategory: 'اختر صنف',
      UpdateProduct:'تحديث المنتج',
      DeleteProduct:'مسح المنتج',
   AddProduct:'ٌإضاقة منتح جديد',
   Description:'الوصف',
   Orders:"طلبات العملاء",
   NoOrders:"لا يوجد طلبات مسجلة",
   Table:"الطاولة",
   Confirm:"تم التسليم",
   About:"نحن فريق من الشباب السوريين نسعى لدمج التكنولوجيا بالتقاليد لتحسين تجربة الضيافة في سوريا. يوفر  حياك حلولًا رقمية حديثة مثل قوائم الـ QR للمطاعم والمقاهي، مما يسهم في تطوير قطاع السياحة والضيافة، وجعل الخدمات أكثر كفاءة وسهولة.",
   
   Team: "الفريق",
AhmedA: "المهندس أحمد العلي",
Developer: " مهندس برمجيات | القسم التقني ",
AhmedLoc:"اسطنبول - تركيا ",
WardKh:"المهندس ورد خلف ",
Marketing: "مهندس حاسوب - تسويق ",
WardLoc: "دمشق - سوريا ",
AhmedS: "المهندس أحمد السباعي",
AhmedJob: "إدارة التواصل الاجتماعي والتسويق",
AhmedSLoc: "حمص - سوريا",
AboutUs: "من نحن",
TableNo: "من فضلك ادخل رقم الطاولة",
Seraj: "سراج حريري",
Sloc:"المملكة العربية السعودية",
Sjob:"مدير قسم خدمة العملاء والتسويق"
    
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', // Default language
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false,
    },
  });

// Function to update text direction
const updateDirection = (lng) => {
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
};

// Listen for language changes and update direction
i18n.on('languageChanged', updateDirection);
updateDirection(i18n.language); // Set initial direction

export default i18n;

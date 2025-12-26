import { Product, Order } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Ceramic Minimalist Vase',
    price: 25.00,
    originalPrice: 35.00,
    category: 'Home',
    rating: 4.8,
    reviews: 124,
    stock: 12,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFoiG6KYM43VfJouEy2Naih9rArmLPUNIBsfeRGtdMKkDX0ewOBWAnII3hCA2sz3_6wv5Uf307JwP22lsJ4vcOL126gbx-BIl7oRsRPVvdyEQjHiGB-iBFSAqnzkcG5_yMBvHSuPCW6Ym_tXvP_RQ8tZk_Jmy3aeblGg6-lQhTTr5nVlBsP7jcIUtOVLsWdXiQbxvp4V91voLqKVWyQYT7P39Q87p9suokMAvqeGzIRcutE92FNFSR4z9H9oKWCp_B8ZOBHYtvN44',
    description: 'Handcrafted from organic clay, this vase adds a touch of modern elegance to any room. Its matte finish and curved silhouette make it a perfect centerpiece.'
  },
  {
    id: '2',
    name: 'Pro Wireless Earbuds',
    price: 45.00,
    category: 'Electronics',
    rating: 4.5,
    reviews: 89,
    stock: 0,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqO4dbLR3D5WWxgwu0-kEe17GgUVfH-ArVVjNmKbV9e74nMkLmbQ-rfZAZYPkRzkAH7TrzuOzv3BzAzA93CL8Tq3PUjQYgsZglQb6F9N5iyTCBUVf4Jp_04Ys_GKdJjCWW5vM3WS6J3edyyxmMGlsXrYcqbAGqpwUbjd4exYYnavpMw0DrJtKhhHqYL37wM20owDFEPxPl4ccHrg5UwYI0VoJ9toqaRE7kEV1HzbfVBNolWRTvOfYZgUnjjVJrZS0Ef1O-EIxAW_0',
    description: 'Experience crystal clear sound with active noise cancellation and 24-hour battery life.'
  },
  {
    id: '3',
    name: 'Premium Cotton T-Shirt',
    price: 12.00,
    category: 'Clothing',
    rating: 4.2,
    reviews: 210,
    stock: 50,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAn-k-_k_ib2r789Ui931rZ1N6yhn239RwT2BXby_Elzhb7xdXz95KnLfr3t9DaDQrSOlfw04aWD9cUpdYxQlG50z2r_2crvft_V1Kjz3qI-feitJgSmyHHkMPaX0fz_Be8o52o1jjNPVIHUtsre_64XfaUgjLEy_gjPb-MgpIGJmjNHF02H6maH-DxzbztKb1ShazXuuuaiKcnlwjSAy9ttkFZTHB5f7AZMPE9jBU2PNfbw13lBIJoNU4j8w0XCla8in2I6H-D2dQ',
    description: '100% organic cotton basic tee. Breathable, durable, and essential for every wardrobe.'
  },
  {
    id: '4',
    name: 'Modern Desk Lamp',
    price: 30.00,
    category: 'Home',
    rating: 4.9,
    reviews: 56,
    stock: 8,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-3F-9qHDdmHzE86uyMv5427AhN6zuJ_pm-MNLoBPdpwQlorxSXS2ULt36kmvMm11V0elzbm0dZsn0kb5l0Rzr9_iCp_GozaIhOYmDNQIeeBp-mjPzg7J7pir-eHUAJm1qplnPRu9x4e1k1qu8Em6V1gMKtJ32AzCqxuOK_SaLUssC0mqXs636o3a6wRkaBX7H_mW9hKE613Jh2pBPSrT8rbl5alFEq_YJPkrR3vPs1GHhvT7w4_LDhFKPdMk3KEf5b1FQ9GDIqA0',
    description: 'Adjustable LED desk lamp with touch controls and warm/cool light modes.'
  },
  {
    id: '5',
    name: 'Indoor Succulent',
    price: 8.00,
    category: 'Home',
    rating: 4.7,
    reviews: 32,
    stock: 15,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpCYavKs5MB35P7EI-lWZ9JMO4ptbgAqs5FnI8i-a9JsDaInlHxiL62tW0fhztpcHdNM4Mwb5DMvVQTn6yJPAYKjrVDFM8O8Subh9IJVnETEr5jf5eNn39TJrVV7zNkFot6Vg5FnVduemr7zH_-sPFphSpz7RG9sY10a3HArN5J74Lt6WvndflxDmHa88TJOdHSMyNCP4pnvh9qwgfkifQ-p3pIhrnQk6vcNq_IMGEwk0zDpL-BdwJEaakcGNhwBNFDEyXz56H_6I',
    description: 'Low maintenance indoor plant in a white ceramic pot.'
  },
  {
    id: '6',
    name: 'Artisan Coffee Mug',
    price: 15.00,
    category: 'Home',
    rating: 4.6,
    reviews: 98,
    stock: 24,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaGvnZacE-m5pKuOJoOspB2qx3EGZT_919_ZxuZXA4XSD5XPBI6Y1BA3_2r8b0RoVh0hvNz-yE0Gcw7krgHuVgFdaLmDuNmPecV3rzSS2PfYIBXFGS-RL-llrjU6I-tOxe0YhTVTbxqi_QCQc_VICpIEnSsSCni9jH6JJs06cci57FvU8itCzTiECZJ_Z2zA14uH8vjVb6OgvDLP-KtotqL-ZaMMedY4LnFPty53OayFGRNs_gUMNGsUnIC_wL_Rq4WYlZjhXV808',
    description: 'Hand-glazed ceramic mug, perfect for your morning brew.'
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-2930',
    date: 'Oct 24, 2023 at 4:30 PM',
    status: 'Delivered',
    total: 145.00,
    items: 3,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1b87sm614VOugpfPFIEpcrDwNwLqGF1iGfpZYV0QuNRygoRr-2xORypmh-raatPUZl_UYZbnom-LvUWEwAurl-pnh46t1ScjiclygPjvCAkK1pJzgfKjLZngyxbSm4ynHu6roRv9K8N6k4fdF5mRlQbevO2fQTmZbZRx3sx8zA45kVA_5CB4ZGXI1T2tUVciC044ayxY5Tk-LbhTg9p3AU1_Wz2aFAkFYEOYxrf8z6kulMq_4lrYzgTEzkfjX8zG-cG7-UayzgLQ'
  },
  {
    id: 'ORD-2929',
    date: 'Oct 20, 2023 at 10:15 AM',
    status: 'Processing',
    total: 120.50,
    items: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAi40kiRgYQe2rDoL7uFWy8lo1sAY_YwY8dgF4gnYxNqK2kkWOlhDE80590Thl6atNDsSoqabvTVervAOEJbZQwueOOChcvag46iF7LcCHkgY3sz5RhBzSi3gxM83avqbpQMttTzkLEr61gFiQ1KRVnQKO_3Un0H9Oljgwn-FTufrnz61_0Dn3h3tobadQRLfxLYN1OGTrUYGBRn3EDjRgyH5UDTyEKmmdUmLl4HA-MMck_BgC8wh9rKy1UA115GjhhSokn98_eem8'
  },
  {
    id: 'ORD-2920',
    date: 'Sep 15, 2023 at 1:00 PM',
    status: 'Shipped',
    total: 89.99,
    items: 5,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAV3iwi235Ck2aSdoZ3O2DyCoyyOYr-5BSW4shRxqcSpKZAs5kwNpaJ1oJ7_PCgZ9KTXSl4ph01b4xwIKjuQtjOl4vH_sHNmFt-nVK5CGATnLZ8DQbvoUzPogv3uzoLx18PuuHiLyOJc38r8_-D_DPONqpIiVuS2G_b7mDXLfusoETzXQx4Ay12UMhSkPfStDdutowXJ3U7d7Jn37odQTSOss6bEkHM73U56atp8UuPZZq3XKIiK8yT_XD7eN6ZD3J72-SWroS_Two'
  },
  {
    id: 'ORD-2915',
    date: 'Aug 02, 2023',
    status: 'Cancelled',
    total: 299.00,
    items: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1sMynR_zZAuxMCYr3JCJIvppxkvxEUWwIl6O8CIuyRM8BXORhScGKSJerp1BIZAqhOwzxok5DZJ2oLZcFBiafqt1IQbVrI8h_d2I0yADEIbjxw85CTUYYlpExYv1cqgkYaqA_y0EtRdjmgWQISfAi3y1kjdogS-zIX_OWs6_rCNymdfSst8oRGW-w-VjKsbvsGH7AmhZlBo-lL3H752IVtJCdi8hEuxvZ-JKGZhq_uWUrgtDYfdnZaHd-zZFKz0hseoyQo1GfOkU'
  }
];
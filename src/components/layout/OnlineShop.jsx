import scss from "./OnlineShop.module.scss";
import { useState } from "react";
import {
  useGetOnlineShopsQuery,
  useAddOnlineShopMutation,
  useDeleteOnlineShopMutation,
} from "../../api/api";

const OnlineShop = () => {
  const { data: onlineShops = [], error, refetch } = useGetOnlineShopsQuery();
  const [newProductName, setNewProductName] = useState("");
  const [addOnlineShop] = useAddOnlineShopMutation();
  const [deleteOnlineShop] = useDeleteOnlineShopMutation();
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOnlineShops = onlineShops.filter((list) =>
    list.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOnlineShop = async () => {
    if (newProductName) {
      await addOnlineShop({ name: newProductName });
      setNewProductName("");
      refetch();
    }
  };

  const handleDeleteOnlineShop = async (id) => {
    await deleteOnlineShop(id);
    refetch();
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className={scss.container}>
      <div className={scss.search}>
        <h1 className={scss.title}>Все крассовки</h1>
        <input
          type="text"
          placeholder="Поиск товаров..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={scss.searchInput}
        />
      </div>

      <div className={scss.main}>
        <ul className={scss.menu}>
          {filteredOnlineShops.map((list) => (
            <li className={scss.menu_item} key={list.id}>
              <img
                src={list.img}
                alt={list.name}
                style={{ width: "120px", height: "120px" }}
              />
              <h4>{list.name}</h4>
              <span className={scss.price}>
                <strong>{list.price} som</strong>
              </span>
              <button
                className={scss.btn}
                onClick={() => handleAddToCart(list)}
              >
                +
              </button>
              {/* <button onClick={() => handleDeleteOnlineShop(list.id)}>
                &times;
              </button> */}
            </li>
          ))}
        </ul>

        <div className={scss.prod}>
          <h3>Общая стоимость: {getTotalPrice()} som</h3>
          <h2 className={scss.tit}>Корзина</h2>
          <ul className={scss.cart}>
            {cart.map((item) => (
              <li className={scss.cart_item} key={item.id}>
                <img
                  src={item.img}
                  alt={item.name}
                  style={{ width: "100px", height: "100px" }}
                />
                <h4>{item.name}</h4>
                <span>
                  <strong>{item.price} som</strong>
                </span>
                <button
                  className={scss.btn2}
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  &times;
                </button>
                <p>Количество: {item.quantity}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <input
          type="text"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
        />
        <button onClick={handleOnlineShop}>Add Online Product</button>
      </div>
    </div>
  );
};

export default OnlineShop;
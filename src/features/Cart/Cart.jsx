import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../Contexts/CartProvider';
import './Cart.scss';

Cart.propTypes = {};

function Cart(props) {
    const [tt, setTT] = useState([]);
    const context = useContext(CartContext);
    var indexProduct = context.cart.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.quality;
    }, 0);

    function addQualities(params) {
        context.addQuality(params);
    }

    function minusQualities(params) {
        context.minusQuality(params);
    }

    function deleteCart(params) {
        context.deleteCart(params);
    }

    function totalPrice() {
        return context.cart.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue.quality * currentValue.pricenew;
        }, 0).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    }

    return (
        <div id="content">
            {/* Direct */}
            <div className="container">
                <div className="row direct">
                    <ul className="direct__list">
                        <li className="direct__item">
                            <Link to="/" className="direct__link">Trang chủ</Link>
                            <i className="fas fa-angle-right"></i>
                        </li>
                        <li className="direct__item">
                            <span className="direct__text">Giỏ hàng</span>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Cart */}
            <div id="cart">
                <div className="container">
                    <p className="cart__tittle">
                        GIỎ HÀNG
                        <span>
                            (<span className="cart__tittle-count">
                                {indexProduct}
                            </span> sản phẩm)
                        </span>
                    </p>
                    <div className="row">
                        <div className={`cart__empty ${indexProduct === 0 ? "active" : ""}`}>
                            <img src="./images/cart/empty-cart.png" alt="" />
                            <div className="button">
                                <Link to="/" className="btns btn__dark">TIẾP TỤC MUA SẮM</Link>
                            </div>
                        </div>
                    </div>
                    <div className={`cart__item ${indexProduct !== 0 ? "active" : ""}`}>
                        <div className="row">
                            <div className="col-xl-9 col-lg-12 col-md-12 col-sm-12 col-12">
                                {
                                    context.cart.map((e, i) => {
                                        return (
                                            <div className="row cart__product" key={i}>
                                                <div className="col-xl-offset-3 col-lg-offset-3 col-md-offset-3 col-sm-offset-3 col-offset-3">
                                                    <Link to={`/product/${e.id}`} title={e.name}>
                                                        <img src={`./images/product/${e.imageafter}`} alt="" className="cart__item-img" />
                                                    </Link>
                                                </div>
                                                <div className="col-xl-offset-9 col-lg-offset-9 col-md-offset-9 col-sm-offset-9 col-offset-9 card__box">
                                                    <div className="cart__info">
                                                        <p className="cart__info-name">
                                                            <Link to={`/product/${e.id}`}>{e.name}</Link>
                                                        </p>
                                                        <p className="cart__info-action">
                                                            <Link onClick={() => deleteCart(e)}>Xóa</Link>
                                                        </p>
                                                    </div>
                                                    <span className="cart__price">{e.pricenew}₫</span>
                                                    <div className="cart__quality">
                                                        <button className="cart__quality-btn math" onClick={() => addQualities(e)}>+</button>
                                                        <input type="text" className="cart__quality-btn num" value={e.quality} name="quality" id="quality" />
                                                        <button className="cart__quality-btn math" onClick={() => minusQualities(e)}>-</button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <div className="col-xl-3">
                                <div className="cart__submit">
                                    <p className="cart__submit-fee">
                                        <span className="cart__fee-text">Tạm tính:</span>
                                        <span className="cart__fee-price">{totalPrice()}</span>
                                    </p>
                                    <p className="cart__submit-total">
                                        <span className="cart__total-text">Thành tiền:</span>
                                        <span className="cart__total-price">{totalPrice()}</span>
                                    </p>
                                    <div className="button">
                                        <Link to="/" className="btns btn__darkwhite" style={{ width: "100%" }} title="Thanh toán ngay">THANH TOÁN NGAY</Link>
                                    </div>
                                    <br />
                                    <div className="button">
                                        <Link to="/" className="btns btn__whitedark" style={{ width: "100%" }} title="Tiếp tục mua hàng">TIẾP TỤC MUA HÀNG</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
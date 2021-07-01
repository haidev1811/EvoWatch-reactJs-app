import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../../../../features/Contexts/CartProvider';
import { useHistory } from 'react-router';

ListProductPage.propTypes = {};

function ListProductPage(props) {
    const context = useContext(CartContext);
    function addCart(el) {
        context.addCart(el);
    }

    let history = useHistory();
    function nextPage(p) {
        history.push(`/detailproduct/${p}`);
    }

    return (
        <div className="row product">
            {
                props.sanPham.map((e, i) => {
                    return (
                        <div className="col-xl-4 product__card">
                            <a className="product__link" onClick={() => nextPage(e.id)}></a>
                            <span className={`product-sale ${e.sale !== "" ? "sale" : ""}`}>{e.sale}%</span>
                            <div className="product__img">
                                <div className="product__img-before">
                                    <img src={`./images/product/${e.imageafter}`} alt="" />
                                </div>
                                <div className="product__img-after">
                                    <img src={`./images/product/${e.imagebefore}`} alt="" />
                                </div>
                            </div>
                            <span className="product__desc">{e.material}</span>
                            <span className="product__name">{e.name}</span>
                            <div className="product__price">
                                <span className="product__price-new">{e.pricenew}₫</span>
                                <span className="product__price-old">{e.priceold}₫</span>
                            </div>
                            <div className="product__add" title="Thêm vào giỏ hàng" onClick={() => addCart(e)}>Thêm vào giỏ hàng</div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default ListProductPage;
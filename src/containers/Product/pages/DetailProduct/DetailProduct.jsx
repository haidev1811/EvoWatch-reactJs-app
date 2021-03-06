import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/DetailProduct.scss';
import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'swiper';
import { CartContext } from '../../../../features/Contexts/CartProvider';
import { ModalContext } from '../../../../features/Contexts/ModalProvider';
import { useHistory } from 'react-router';

DetailProduct.propTypes = {};

function DetailProduct(props) {
    const [toogle, setToogle] = useState(1);
    const [toogleDesc, setToogleDesc] = useState(1);
    const context = useContext(CartContext);
    var sp = context.listProduct.find(e => e.id === props.match.params.slug);

    const { openModal } = useContext(ModalContext);

    const handleOpenModal = () => {
        openModal();
    }

    let history = useHistory();
    function nextPage(p) {
        history.push(`/detailproduct/${p}`);
    }

    function addCart(el) {
        context.addCart(el);
    }

    function addQualities(params) {
        context.addQuality(params);
    }

    function minusQualities(params) {
        context.minusQuality(params);
    }

    const onToogleDesc = (index) => {
        setToogleDesc(index);
    }

    const onToogleImg = (index) => {
        setToogle(index);
    }

    useEffect(() => {
        const swiper = new Swiper('.product', {
            slidesPerView: 2,
            spaceBetween: 0,
            breakpoints: {
                575: {
                    slidesPerView: 2,
                    spaceBetween: 0,
                },
                992: {
                    slidesPerView: 2,
                    spaceBetween: 0,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 0,
                }
            },
            loop: false,
            loopFillGroupWithBlank: false,
        })
    });

    return (
        <div id="content">
            <div className="container">
                {/* Direct */}
                <div className="row direct">
                    <ul className="direct__list">
                        <li className="direct__item">
                            <Link to="/" className="direct__link">Trang ch???</Link>
                            <i className="fas fa-angle-right"></i>
                        </li>
                        <li className="direct__item">
                            <Link to="/product" className="direct__link">S???n ph???m m???i</Link>
                            <i className="fas fa-angle-right"></i>
                        </li>
                        <li className="direct__item">
                            <span className="direct__text">{sp.name}</span>
                        </li>
                    </ul>
                </div>

                {/* Detail */}
                <div className="row product__detail">
                    <div className="col-xl-6 col-lg-6 col-md-6">
                        <div className="row">
                            <div className="col-xl-12">
                                <img src={`../images/product/${sp.imageafter}`} alt="" className={`product__detail-img ${toogle === 1 ? "active" : ""}`} />
                                <img src={`../images/product/${sp.imagebefore}`} alt="" className={`product__detail-img ${toogle === 2 ? "active" : ""}`} />
                                <img src={`../images/product/${sp.imageafter}`} alt="" className={`product__detail-img ${toogle === 3 ? "active" : ""}`} />
                                <img src={`../images/product/${sp.imagebefore}`} alt="" className={`product__detail-img ${toogle === 4 ? "active" : ""}`} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="product__list">
                                <div className={`product__list-item ${toogle === 1 ? "active" : ""}`} onClick={() => onToogleImg(1)}>
                                    <img src={`../images/product/${sp.imageafter}`} alt="" />
                                </div>
                                <div className={`product__list-item ${toogle === 2 ? "active" : ""}`} onClick={() => onToogleImg(2)}>
                                    <img src={`../images/product/${sp.imagebefore}`} alt="" />
                                </div>
                                <div className={`product__list-item ${toogle === 3 ? "active" : ""}`} onClick={() => onToogleImg(3)}>
                                    <img src={`../images/product/${sp.imageafter}`} alt="" />
                                </div>
                                <div className={`product__list-item ${toogle === 4 ? "active" : ""}`} onClick={() => onToogleImg(4)}>
                                    <img src={`../images/product/${sp.imagebefore}`} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6">
                        <div className="product__detail-tittle">
                            <p className="detail__tittle-name">{sp.name}</p>
                            <p className="detail__tittle-sku">
                                SKU:
                                <span>(??ANG C???P NH???T...)</span>
                            </p>
                            <Link to="#" className="detail__tittle-rate">????nh gi??</Link>
                        </div>
                        <div className="product__detail-price">
                            <div className="detail__price">
                                <span className="detail__price-new">{sp.pricenew}???</span>
                                <span className={`detail__price-text ${sp.priceold === "" ? "disable" : ""}`}>Gi?? th??? tr?????ng:</span>
                                <span className={`detail__price-old ${sp.priceold === "" ? "disable" : ""}`}>{sp.priceold}???</span>
                            </div>
                            <div className="detail__price-desc">
                                <p className={`detail__price-save ${sp.priceold === "" ? "disable" : ""}`}>
                                    Ti???t ki???m:
                                    <span>{sp.priceold - sp.pricenew}???</span>
                                </p>
                                <p>
                                    T??nh tr???ng:
                                    <span>C??n h??ng</span>
                                </p>
                            </div>
                        </div>
                        <div className="product__detail-quality">
                            <span>S??? l?????ng:</span>
                            {
                                context.cart.map((e, i) => {
                                    return (
                                        <div className="detail__quality" key={i}>
                                            <button className="detail__quality-btn" onClick={() => minusQualities(e)}>-</button>
                                            <input type="text" className="detail__quality-in" value={e.quality} name="quality" id="quality" />
                                            <button className="detail__quality-btn" onClick={() => addQualities(e)}>+</button>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <Link to="#" className="product__detail-btn" onClick={() => addCart(sp)}>
                            <p className="detail__btn-header" onClick={handleOpenModal}>
                                MUA NGAY V???I GI?? {sp.pricenew}???
                            </p>
                            <p className="detail__btn-desc">
                                ?????t mua giao h??ng t???n n??i
                            </p>
                        </Link>
                        <p className="product__detail-hotline">
                            G???i ?????t mua:
                            <Link to="tel:0123456789">0123 456 789</Link>
                            (mi???n ph?? 8:30 - 21:30).
                        </p>
                        <div className="product__detail-service">
                            <div className="detail__service">
                                <img src="../images/icon/policy_images_2.svg" alt="" />
                                <p className="detail__service-text">
                                    MI???N PH?? V???N CHUY???N V???I ????N H??NG
                                    <span>T??? 700.000??</span>
                                </p>
                            </div>
                            <div className="detail__service">
                                <img src="../images/icon/policy_images_3.svg" alt="" />
                                <p className="detail__service-text">
                                    B???O H??Nh
                                    <span>10 N??M</span>
                                    DO L???I NH?? S???N XU???T
                                </p>
                            </div>
                            <div className="detail__service">
                                <img src="../images/icon/policy_images_4.svg" alt="" />
                                <p className="detail__service-text">
                                    CAM K???T
                                    <span>100% CH??NH H??NG</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row product__tabs">
                    <ul className="product__tabs-list">
                        <li className="product__tabs-item">
                            <Link to="#" className={`product__tabs-link ${toogleDesc === 1 ? "active" : ""}`} onClick={() => onToogleDesc(1)}>M?? T???</Link>
                        </li>
                        <li className="product__tabs-item">
                            <Link to="#" className={`product__tabs-link ${toogleDesc === 2 ? "active" : ""}`} onClick={() => onToogleDesc(2)}>GI???I THI???U</Link>
                        </li>
                    </ul>
                </div>
                <div className={`product__tabs-desc  ${toogleDesc === 1 ? "active" : ""}`}>
                    <div className="row">
                        <div className="product__review">
                            <p className="product__review-tittle">?????ng h??? MVMT Crux thu???c b??? BST Nova Collection m???i nh???t 2017 ???????c ?????t theo t??n c??c v?? tr??? v?? thi???t k??? cho nh???ng ng?????i theo d???u nh???ng v?? sao. M???t 38mm ???n t?????ng ?????y tinh t??? v???i ch???c n??ng xem 2 m??i gi???. Mi???n ph?? v???n chuy???n v?? ?????i tr??? to??n qu???c!</p>
                        </div>
                    </div>
                    <div className="row">
                        <table className="product__table">
                            <tr>
                                <td>
                                    <p>Lo???i m??y</p>
                                </td>
                                <td>
                                    <p>Japanese Miyota Precison Quartz</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Hi???n th???</p>
                                </td>
                                <td>
                                    <p>6 Hand Dual Time Movement</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Ch???t li???u v???</p>
                                </td>
                                <td>
                                    <p>316 Low Carbon Stainless Steel</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>???????ng k??nh v???</p>
                                </td>
                                <td>
                                    <p>	38mm</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>????? d??y v???</p>
                                </td>
                                <td>
                                    <p>10mm</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Lo???i m??y</p>
                                </td>
                                <td>
                                    <p>Japanese Miyota Precison Quartz</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Ch???t li???u d??y ??eo</p>
                                </td>
                                <td>
                                    <p>	316 Low Carbon Stainless Steel</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Chi???u r???ng d??y ??eo</p>
                                </td>
                                <td>
                                    <p>	16mm</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Ch???t li???u m???t k??nh</p>
                                </td>
                                <td>
                                    <p>Mineral (K??nh Kho??ng Ch???t)</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Kh??? n??ng ch???u n?????c</p>
                                </td>
                                <td>
                                    <p>5ATM (50m)</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className={`product__tabs-intro  ${toogleDesc === 2 ? "active" : ""}`}>
                    <p>Ki???n th???c v??? ?????ng h???, th??ng tin khuy???n m??i, tin t???c & s??? ki???n, h??nh ???nh, video clip v??? ?????ng h??? ??eo tay m???i nh???t hi???n nay, c???p nh???t li??n t???c nhanh v?? ?????y ?????...</p>
                </div>
                {/* Product */}
                <div className="tittle">
                    <div className="tittle__heading">
                        <Link to="/product" className="tittle__heading-link">
                            S???N PH???M
                            <strong>LI??N QUAN</strong>
                        </Link>
                    </div>
                </div>
                <div className="swiper-container product">
                    <div className="swiper-wrapper">
                        {
                            context.listProduct.map((e, i) => {
                                return (
                                    <div className="swiper-slide" key={i}>
                                        <div className="product__card">
                                            <Link to="#" className="product__link" onClick={() => nextPage(e.id)}></Link>
                                            <span className={`product-sale ${e.sale !== "" ? "sale" : ""}`}>{e.sale}</span>
                                            <div className="product__img">
                                                <div className="product__img-before">
                                                    <img src={`../images/product/${e.imageafter}`} alt="" />
                                                </div>
                                                <div className="product__img-after">
                                                    <img src={`../images/product/${e.imagebefore}`} alt="" />
                                                </div>
                                            </div>
                                            <span className="product__desc">{e.material}</span>
                                            <span className="product__name">{e.name}</span>
                                            <div className="product__price">
                                                <span className="product__price-new">{e.pricenew}???</span>
                                                <span className={`product__price-old ${e.priceold === "" ? "disable" : ""}`}>{e.priceold}???</span>
                                            </div>
                                            <div className="product__add hide-on-mobile-tablet" title="Th??m v??o gi??? h??ng" onClick={() => addCart(e)}>Th??m v??o gi??? h??ng</div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailProduct;
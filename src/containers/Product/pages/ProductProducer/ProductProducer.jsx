import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../../../features/Contexts/CartProvider';
import '../../styles/Product.scss';
import CategoryMobile from '../CategoryMobile';
import ListProductProducer from './ListProductProducer';

ProductProducer.propTypes = {};

function ProductProducer(props) {
    const context = useContext(CartContext);
    var sp = context.productProducer.filter(e => e.slug === props.match.params.slug);
    const [nsx, setNsx] = useState([]);
    const [extra, setExtra] = useState([]);
    const [toogle, setToogle] = useState(0);
    const [toogleSort, setToogleSort] = useState(0);
    const [toogleCate, setToogleCate] = useState(false);

    useEffect(() => {
        fetch("https://60d56ce2943aa60017768911.mockapi.io/producers")
            .then(res => res.json())
            .then((result) => {
                setNsx(result.map(e => { return { ...e, tt: false } }));
            },
                (error) => {

                }
            )
        fetch("https://60d1f5d75b017400178f4cb3.mockapi.io/listextra")
            .then(res => res.json())
            .then((result) => {
                setExtra(result.map(e => { return { ...e, tt: false } }));
            },
                (error) => {

                }
            )
    }, []);

    const onToogler = (index) => {
        setToogle(index);
    }

    const onToogleSort = (index) => {
        setToogleSort(index);
    }

    function onToogleCate() {
        toogleCate ? setToogleCate(false) : setToogleCate(true);
    }

    function changeNsx(e) {
        setNsx(nsx.map(
            u => u.idNsx === e ? { ...u, tt: true } : { ...u, tt: false }
        ));
        context.setProductProducer(sp.filter(x => x.idNsx === e))
    }

    function sortGiaTang() {
        context.sortGiaTang();
    }

    function sortGiaGiam() {
        context.sortGiaGiam();
    }

    return (
        <div id="content">
            <div className="banner">
                <img src="../images/evo-col-banner.jpg" alt="" />
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8">
                            <div className="banner__text">
                                <span className="banner__heading">T???T C??? S???N PH???M</span>
                                <span className="banner__desc">Ki???n th???c v??? ?????ng h???, th??ng tin khuy???n m??i, tin t???c & s??? ki???n, h??nh ???nh, video clip v??? ?????ng h??? ??eo tay m???i nh???t hi???n nay, c???p nh???t li??n t???c nhanh v?? ?????y ?????...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="category-mobile show-on-mobile-tablet">
                <i className={`fa fa-filter open ${toogleCate ? "disable" : ""}`} onClick={onToogleCate}></i>
                <CategoryMobile toogle={toogle} onToogler={onToogler} nsx={nsx} extra={extra} changeNsx={changeNsx} toogleCate={toogleCate} onToogleCate={onToogleCate}></CategoryMobile>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-3 col-lg-3 hide-on-mobile-tablet">
                        <div className="category">
                            <p className="category__heading">DANH M???C</p>
                            <ul className="category__list">
                                <li className="category__item">
                                    <Link to="/" className="category__link">Trang ch???</Link>
                                </li>
                                <li className="category__item">
                                    <Link to="/intro" className="category__link">Gi???i thi???u</Link>
                                    <span className={`category__plus ${toogle === 1 ? "active" : ""}`} onClick={() => onToogler(1)}></span>
                                    <ul className="category__drop">
                                        <li className="category__drop-item">
                                            <Link to="/intro-replace" className="category__drop-link">Ch??nh s??ch ?????i h??ng</Link>
                                        </li>
                                        <li className="category__drop-item">
                                            <Link to="/intro-faq" className="category__drop-link">FAQ</Link>
                                        </li>
                                        <li className="category__drop-item">
                                            <Link to="/intro-pay" className="category__drop-link">H?????ng d???n thanh to??n</Link>
                                        </li>
                                        <li className="category__drop-item">
                                            <Link to="/intro-ship" className="category__drop-link">Ch??nh s??ch v???n chuy???n</Link>
                                        </li>
                                        <li className="category__drop-item">
                                            <Link to="/intro-shop" className="category__drop-link">H??? th???ng c???a h??ng</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className={`category__item`}>
                                    <Link to="/productmen" className="category__link">Nam</Link>
                                    <span className={`category__plus ${toogle === 2 ? "active" : ""}`} onClick={() => onToogler(2)}></span>
                                    <ul className="category__drop">
                                        {
                                            nsx.map((e, i) => {
                                                return (
                                                    <li className="category__drop-item" key={i}>
                                                        <Link to={`/productproducer/${e.nameNsx}`} className="category__drop-link">{`?????ng h??? ${e.nameNsx}`}</Link>
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                </li>
                                <li className="category__item">
                                    <Link to="/productwomen" className="category__link">N???</Link>
                                    <span className={`category__plus ${toogle === 3 ? "active" : ""}`} onClick={() => onToogler(3)}></span>
                                    <ul className="category__drop">
                                        {
                                            nsx.map((e, i) => {
                                                return (
                                                    <li className="category__drop-item" key={i}>
                                                        <Link to={`/productproducer/${e.nameNsx}`} className="category__drop-link">{`?????ng h??? ${e.nameNsx}`}</Link>
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                </li>
                                <li className={`category__item`}>
                                    <Link to="/productextra" className="category__link">Ph??? ki???n</Link>
                                    <span className={`category__plus ${toogle === 4 ? "active" : ""}`} onClick={() => onToogler(4)}></span>
                                    <ul className="category__drop">
                                        {
                                            extra.map((e, i) => {
                                                return (
                                                    <li className="category__drop-item" key={i}>
                                                        <Link to={`/extraproducer/${e.nameextra}`} className="category__drop-link">{e.nameextra}</Link>
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                </li>
                                <li className={`category__item`}>
                                    <Link to="/product" className="category__link">S???n ph???m</Link>
                                    <span className={`category__plus ${toogle === 5 ? "active" : ""}`} onClick={() => onToogler(5)}></span>
                                    <ul className="category__list-sub">
                                        <li className="category__item">
                                            <Link to="/productmen" className="category__link">Nam</Link>
                                            <span className={`category__plus ${toogle === 6 ? "active" : ""}`} onClick={() => onToogler(6)}></span>
                                            <ul className="category__drop">
                                                {
                                                    nsx.map((e, i) => {
                                                        return (
                                                            <li className="category__drop-item" key={i}>
                                                                <Link to={`/productproducer/${e.nameNsx}`} className="category__drop-link">{`?????ng h??? ${e.nameNsx}`}</Link>
                                                            </li>
                                                        );
                                                    })
                                                }
                                            </ul>
                                        </li>
                                        <li className="category__item">
                                            <Link to="/productwomen" className="category__link">N???</Link>
                                            <span className={`category__plus ${toogle === 7 ? "active" : ""}`} onClick={() => onToogler(7)}></span>
                                            <ul className="category__drop">
                                                {
                                                    nsx.map((e, i) => {
                                                        return (
                                                            <li className="category__drop-item" key={i}>
                                                                <Link to={`/productproducer/${e.nameNsx}`} className="category__drop-link">{`?????ng h??? ${e.nameNsx}`}</Link>
                                                            </li>
                                                        );
                                                    })
                                                }
                                            </ul>
                                        </li>
                                        <li className="category__item">
                                            <Link to="/productextra" className="category__link">Ph??? ki???n</Link>
                                            <span className={`category__plus ${toogle === 8 ? "active" : ""}`} onClick={() => onToogler(8)}></span>
                                            <ul className="category__drop">
                                                {
                                                    extra.map((e, i) => {
                                                        return (
                                                            <li className="category__drop-item" key={i}>
                                                                <Link to={`/extraproducer/${e.nameextra}`} className="category__drop-link">{e.nameextra}</Link>
                                                            </li>
                                                        );
                                                    })
                                                }
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li className="category__item">
                                    <Link to="/news" className="category__link">Tin t???c</Link>
                                </li>
                                <li className="category__item">
                                    <Link to="/contact" className="category__link">Li??n h???</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="filter">
                            <p className="filter__heading">T??M THEO</p>
                            <div className="filter__choose">
                                <div className="filter__choose-text">
                                    <span className="filter__choose-text-tittle">B???n ch???n</span>
                                    <span className="filter__choose-text-close">
                                        B??? h???t
                                        <i className="fas fa-chevron-right"></i>
                                    </span>
                                </div>
                                <ul className="filter__choose-list">
                                    <li className="filter__choose-item">
                                        <i className="fas fa-times"></i>
                                        <span className="filter__choose-item-text">Kashmir</span>
                                    </li>
                                </ul>
                            </div>
                            <p className="filter__tittle">Th????ng hi???u</p>
                            <ul className="filter__list">
                                {
                                    nsx.map((e, i) => {
                                        return (
                                            <li className="filter__item" key={i}>
                                                <input type="checkbox" className="filter__item-in" id={e.nameNsx} name={e.idNsx} />
                                                <div className="filter__item-text">
                                                    <span className={e.tt === true ? "active" : ""} onClick={() => changeNsx(e.idNsx)}>
                                                        <i className="fa"></i>
                                                        {e.nameNsx}
                                                    </span>
                                                </div>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                            <p className="filter__tittle">Gi?? s???n ph???m</p>
                            <ul className="filter__list">
                                <li className="filter__item">
                                    <input type="checkbox" className="filter__item-in" />
                                    <span className="filter__item-text">
                                        <i className="fa"></i>
                                        Gi?? d?????i 100.000??
                                    </span>
                                </li>
                                <li className="filter__item">
                                    <input type="checkbox" className="filter__item-in" />
                                    <span className="filter__item-text">
                                        <i className="fa"></i>
                                        100.000?? - 200.000??
                                    </span>
                                </li>
                                <li className="filter__item">
                                    <input type="checkbox" className="filter__item-in" />
                                    <span className="filter__item-text">
                                        <i className="fa"></i>
                                        200.000?? - 300.000??
                                    </span>
                                </li>
                                <li className="filter__item">
                                    <input type="checkbox" className="filter__item-in" />
                                    <span className="filter__item-text">
                                        <i className="fa"></i>
                                        300.000?? - 500.000??
                                    </span>
                                </li>
                                <li className="filter__item">
                                    <input type="checkbox" className="filter__item-in" />
                                    <span className="filter__item-text">
                                        <i className="fa"></i>
                                        500.000?? - 1.000.000??
                                    </span>
                                </li>
                                <li className="filter__item">
                                    <input type="checkbox" className="filter__item-in" />
                                    <span className="filter__item-text">
                                        <i className="fa"></i>
                                        Gi?? tr??n 1.000.000??
                                    </span>
                                </li>
                            </ul>
                            <p className="filter__tittle">Lo???i</p>
                            <ul className="filter__list">
                                <li className="filter__item">
                                    <input type="checkbox" className="filter__item-in" />
                                    <span className="filter__item-text">
                                        <i className="fa"></i>
                                        Carbon
                                    </span>
                                </li>
                                <li className="filter__item">
                                    <input type="checkbox" className="filter__item-in" />
                                    <span className="filter__item-text">
                                        <i className="fa"></i>
                                        classNameic
                                    </span>
                                </li>
                            </ul>
                            <p className="filter__tittle">K??ch th?????c</p>
                            <ul className="filter__list">
                                <li className="filter__item">
                                    <input type="checkbox" className="filter__item-in" />
                                    <span className="filter__item-text">
                                        <i className="fa"></i>
                                        L???n
                                    </span>
                                </li>
                                <li className="filter__item">
                                    <input type="checkbox" className="filter__item-in" />
                                    <span className="filter__item-text">
                                        <i className="fa"></i>
                                        Nh???
                                    </span>
                                </li>
                                <li className="filter__item">
                                    <input type="checkbox" className="filter__item-in" />
                                    <span className="filter__item-text">
                                        <i className="fa"></i>
                                        V???a
                                    </span>
                                </li>
                            </ul>
                            <p className="filter__tittle">Lo???i d??y</p>
                            <ul className="filter__list">
                                <li className="filter__item">
                                    <input type="checkbox" className="filter__item-in" />
                                    <span className="filter__item-text">
                                        <i className="fa"></i>
                                        Nilong
                                    </span>
                                </li>
                                <li className="filter__item">
                                    <input type="checkbox" className="filter__item-in" />
                                    <span className="filter__item-text">
                                        <i className="fa"></i>
                                        Nh???a
                                    </span>
                                </li>
                                <li className="filter__item">
                                    <input type="checkbox" className="filter__item-in" />
                                    <span className="filter__item-text">
                                        <i className="fa"></i>
                                        Da
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Product Content */}
                    <div className="col-xl-9 col-lg-9">
                        <div className="sort hide-on-mobile">
                            <span className="sort__tittle">X???p theo:</span>
                            <ul className="sort__list">
                                <li className={`sort__item ${toogleSort === 1 ? "active" : ""}`}>
                                    <div className="sort__link" onClick={() => onToogleSort(1)}>
                                        <i></i>
                                        T??n A-Z
                                    </div>
                                </li>
                                <li className={`sort__item ${toogleSort === 2 ? "active" : ""}`}>
                                    <div className="sort__link" onClick={() => onToogleSort(2)}>
                                        <i></i>
                                        T??n Z-A
                                    </div>
                                </li>
                                <li className={`sort__item ${toogleSort === 3 ? "active" : ""}`}>
                                    <div className="sort__link" onClick={() => onToogleSort(3)}>
                                        <i></i>
                                        H??ng m???i
                                    </div>
                                </li>
                                <li className={`sort__item ${toogleSort === 4 ? "active" : ""}`} onClick={sortGiaTang}>
                                    <div className="sort__link" onClick={() => onToogleSort(4)}>
                                        <i></i>
                                        Gi?? th???p ?????n cao
                                    </div>
                                </li>
                                <li className={`sort__item ${toogleSort === 5 ? "active" : ""}`} onClick={sortGiaGiam}>
                                    <div className="sort__link" onClick={() => onToogleSort(5)}>
                                        <i></i>
                                        Gi?? cao xu???ng th???p
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <ListProductProducer sanPham={sp}></ListProductProducer>
                        </div>
                        <div className="row">
                            <div className={`alert`} hidden>
                                <span className="alert__text">Kh??ng c?? s???n ph???m n??o trong danh m???c n??y.</span>
                                <a href="" className="alert__close">
                                    <i className="fas fa-times"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductProducer;
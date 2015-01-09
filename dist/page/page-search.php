<?php $pageType = $_GET['page-type']; ?>

        <!-- Page Search -->
        <div class="page-search">
            <div class="page-search__content-wrapper">
                <form class="page-search__form">

                    <div class="page-search__row page-search__row--level-one">

                        <select name="q" class="page-search__dropdown page-search__dropdown--main" placeholder="Search for real estate listings or articles. ex: 3 bedroom for sale in Brookline under 1,000,000">
                            <option value="Search for real estate listings or articles. ex: 3 bedroom for sale in Brookline under 1,000,000">Search for real estate listings or articles. ex: 3 bedroom for sale in Brookline under 1,000,000</option>
                        </select>
                        <button class="page-search__button page-search__button--level-two-toggle">
                            <span class="down-arrow"></span>
                            <span class="up-arrow" style="display:none;"></span>
                        </button>
                        <button class="page-search__button page-search__button--submit" value=""></button>

                    </div>

                    <div class="page-search__row page-search__row--level-two">

                        <div class="page-search__radio-container page-search__radio-container--home">
                            <div class="page-search__fancy-radio-box page-search__fancy-radio-box--for-sale">
                                <input type="radio" id="forSale" name="buy_or_rent" value="ForSale" checked>
                                </input>
                                <label for="forSale" class="for-sale">For Sale</label>
                            </div>

                            <div class="page-search__fancy-radio-box page-search__fancy-radio-box--for-rent">
                                <input type="radio" id="forRent" name="buy_or_rent" value="ForRent"></input> 
                                <label for="forRent" class="for-rent" >For Rent</label>
                            </div>
                        </div>

                        <select class="page-search__dropdown page-search__dropdown--filter-wide" id="priceRange" name="price_range" placeholder="$300K-$24M">
                            <option value="$300K-$24M">$300K-$24M</option>
                        </select>

                        <select class="page-search__dropdown page-search__dropdown--filter" id="beds" name="beds">
                            <option value="" selected="selected">Beds</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5+">5+</option>
                        </select>

                        <select class="page-search__dropdown page-search__dropdown--filter" id="baths" name="baths">
                            <option value="Baths" selected="selected">Baths</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5+">5+</option>
                        </select>

                        <select class="page-search__dropdown page-search__dropdown--filter" id="homeType" name="home_type">
                            <option value="HomeType" selected="selected">HomeType</option>
                            <option value="Single-Family">Single-Family</option>
                            <option value="Multi-Family">Multi-Family</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Co-op/Condo">Co-op/Condo</option>
                            <option value="Townhome">Townhome</option>
                            <option value="Manufactured">Manufactured</option>
                            <option value="Lot/Land">Land/Lot</option>
                        </select>

                        <button class="page-search__button page-search__button--level-three-toggle" id="moreOptions" name="more_options">
                            <span class="select2-chosen">More (4)</span>
                            <span class="select2-arrow" role="presentation">
                                <b role="presentation"></b>
                            </span>
                        </select>

                        <button class="page-search__button page-search__button--save-search" value="">
                            <span>Save Search</span>
                        </button>
                    </div>

                    <div class="page-search__row page-search__row--level-three">

                        <div class="page-search__row page-search__row--tools">
                            <div class="page-search__button--close">
                                <span>X</span>
                            </div>
                        </div>

                            <div class="col">

                                <section class="filters-list">

                                    <h4>Filter By</h4>

                                    <ul>
                                        <li class="page-search__list-item">
                                            <div class="page-search__fancy-checkbox">
                                                <input type="checkbox" id="openHouses" name="open_houses"></input>
                                                <label for="openHouses">Open Houses</label>
                                            </div>
                                        </li>

                                        <li class="page-search__list-item">
                                            <div class="page-search__fancy-checkbox">
                                                <input type="checkbox" id="newListings" name="new_listings"></input>
                                                <label for="newListings">New Listings</label>
                                            </div>
                                        </li>

                                        <li class="page-search__list-item">
                                            <div class="page-search__fancy-checkbox">
                                                <input type="checkbox" id="reducedPrice" name="reduced_price"></input>
                                                <label for="reducedPrice">Reduced Price</label>
                                            </div>
                                        </li>

                                        <li class="page-search__list-item">
                                            <div class="page-search__fancy-checkbox">
                                                <input type="checkbox" id="newDevelopments" name="new_developments"></input>
                                                 <label for="newDevelopments">New Developments</label>
                                            </div>
                                        </li>

                                        <li class="page-search__list-item">
                                            <div class="page-search__fancy-checkbox">
                                                <input type="checkbox" id="sold" name="sold"></input>
                                                <label for="sold">Sold</label>
                                            </div>
                                        </li>

                                        <li class="page-search__list-item">
                                            <div class="page-search__fancy-checkbox">
                                                <input type="checkbox" id="forclosures" name="forclosures"></input>
                                                <label for="forclosures">Forclosures</label>
                                            </div>
                                        </li>

                                    </ul>

                                </section>

                            </div>

                        <div class="col">
                            
                            <section id="sqFt">
                                <h4>Square Feet</h4>

                                <input type="text" class="page-search__input page-search__input--numeric" name="sq_ft_min" placeholder="Min"></input>&nbsp;&dash;&nbsp;<input type="text" class="page-search__input page-search__input--numeric" name="sq_ft_max" placeholder="Max"></input>

                            </section>

                            <section id="lotSz">
                                <h4>Lot Size</h4>

                                <input type="text" class="page-search__input page-search__input--numeric" name="lot_sz_min" placeholder="Min"></input>&nbsp;&dash;&nbsp;<input type="text" class="page-search__input page-search__input--numeric" name="lot_sz_max" placeholder="Max"></input>

                            </section>

                            <section id="yrsBuilt" title="Years Built">
                                <h4>Years Built</h4>

                                <input type="text" class="page-search__input page-search__input--numeric" name="yrs_built_min" placeholder="Min"></input>&nbsp;&dash;&nbsp;<input type="text" class="page-search__input page-search__input--numeric" name="yrs_built_max" placeholder="Max"></input>

                            </section>

                        </div>

                        <div class="col">

                            <section id="daysOnMkt" title="Days On Market">
                                <h4>Days On Market</h4>

                                <input type="text" class="page-search__input page-search__input--text" name="days_on_mkt"></input>

                            </section>

                            <section id="keywords" title="Keywords">
                                <h4>Keywords</h4>

                                <input type="text" class="page-search__input page-search__input--tokenize" name="keywords"></input>
                            </section>

                        </div>

                        <div class="col">

                            <section id="findByMLS" title="Find by MLS">
                                <h4>Find by MLS</h4>

                                <input type="text" class="page-search__input page-search__input--text" name="mls_id"></input>
                            </section>

                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- Page Search -->
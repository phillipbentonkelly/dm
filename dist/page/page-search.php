<?php $pageType = $_GET['page-type']; ?>

<!-- Page Search -->
<div class="page-search">
    <div class="page-search__content-wrapper">
        <form class="page-search__form" action="#">

            <div class="page-search__row page-search__row--level-one">

                <select class="page-search__dropdown page-search__dropdown--main" name="q">
                    <option></option>
                    <option value="Boston">Boston</option>
                    <option value="Brookline">Brookline</option>
                    <option value="Cambridge">Cambridge</option>
                    <option value="Somerville">Somerville</option>
                    <option value="Waltham">Waltham</option>
                    <option value="Braintree">Braintree</option>
                    <option value="Newton">Newton</option>
                </select>
                <button class="page-search__button page-search__button--level-two-toggle">           
                    <span class="down-arrow"></span>
                    <span class="up-arrow" style="display:none;"></span>                           
                </button>

                <button class="page-search__button page-search__button--submit" value=""></button>

            </div>
            <div class="lower-level">
            <div class="page-search__row page-search__row--level-two">

                <section class="page-search__section" title="Type">
                    <h4 class="mobile">Type</h4>
                    <div class="page-search__container page-search__container--radio">
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
                </section>

                <section class="page-search__section" title="Price">
                    <h4 class="mobile">Price</h4>
                    <div class="page-search__container page-search__container--range price-range-container">
                        <input type="text" class="page-search__input page-search__input--numeric" name="price_range_min" maxlength="9" placeholder="$ Min">
                        </input>
                        &mdash;&nbsp;
                        <input type="text" class="page-search__input page-search__input--numeric" name="price_range_max" maxlength="9" placeholder="$ Max">
                        </input>
                    </div>
                </section>

                <section class="page-search__section" title="Beds">
                    <h4 class="mobile">Beds</h4>
                    <select class="page-search__dropdown page-search__dropdown--filter-fmt" name="beds" data-placeholder="Beds">
                        <option></option>
                        <option value="0+">0+</option>
                        <option value="1+">1+</option>
                        <option value="2+">2+</option>
                        <option value="3+">3+</option>
                        <option value="4+">4+</option>
                        <option value="5+">5+</option>
                    </select>
                </section>

                <section class="page-search__section" title="Baths">
                    <h4 class="mobile">Baths</h4>
                    <select class="page-search__dropdown page-search__dropdown--filter-fmt" name="baths" data-placeholder="Baths">
                        <option></option>
                        <option value="0+">0+</option>
                        <option value="1+">1+</option>
                        <option value="2+">2+</option>
                        <option value="3+">3+</option>
                        <option value="4+">4+</option>
                        <option value="5+">5+</option>
                    </select>
                </section>

                <section class="page-search__section" title="Home Type">
                    <h4 class="mobile">Home Type</h4>
                    <select class="page-search__dropdown page-search__dropdown--filter-hometype" name="home_type" data-placeholder="Home Type">
                        <option></option>
                        <option value="Single-Family">Single-Family</option>
                        <option value="Multi-Family">Multi-Family</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Co-op/Condo">Co-op/Condo</option>
                        <option value="Townhome">Town Home</option>
                        <option value="Manufactured">Manufactured</option>
                        <option value="Lot/Land">Land/Lot</option>
                    </select>
                </section>

                <button class="page-search__button page-search__button--level-three-toggle desktop" id="moreOptions" name="more_options">
                    <span class="select2-chosen">More</span>
                    <span class="select2-arrow" role="presentation">
                        <b role="presentation"></b>
                    </span>
                </select>

            </div>

            <div class="page-search__row page-search__row--level-three">
               
                <div class="page-search__button page-search__button--close desktop">
                    <span>X</span>
                </div>
                

                <div class="col">

                    <section class="page-search__section" id="subtypes" title="Subtypes">

                        <h4 class="desktop">Filter By</h4>
                        <h4 class="mobile">Subtype</h4>

                        <ul>
                            <li class="page-search__list-item">
                                <input type="checkbox" id="openHouses" name="open_houses"></input>
                                <label for="openHouses">Open Houses</label>
                            </li>

                            <li class="page-search__list-item">
                                <input type="checkbox" id="newDevelopments" name="new_developments"></input>
                                <label for="newDevelopments">New Developments</label>
                            </li>

                        </ul>

                    </section>

                </div>

                <div class="col">
                    
                    <section class="page-search__section" id="sqFt" title="Square Feet">
                        <h4>Square Feet</h4>
                        <div class="page-search__container page-search__container--range">
                            <input type="text" class="page-search__input page-search__input--numeric" name="sq_ft_min" placeholder="Min"></input>
                                &mdash;&nbsp;
                            <input type="text" class="page-search__input page-search__input--numeric" name="sq_ft_max" placeholder="Max"></input>
                        </div>
                    </section>

                </div>

                <div class="col">

                    <section class="page-search__section" id="lotSz" title="Lot Size">
                        <h4>Lot Size</h4>
                        <div class="page-search__container page-search__container--range">
                            <input type="text" class="page-search__input page-search__input--numeric" name="lot_sz_min" placeholder="Min"></input>
                                &mdash;&nbsp;
                            <input type="text" class="page-search__input page-search__input--numeric" name="lot_sz_max" placeholder="Max"></input>
                        </div>

                    </section>

                    <!-- <section class="page-search__section" id="daysOnMkt" title="Days On Market">
                        <h4>Days On Market</h4>
                        <select class="page-search__dropdown page-search__dropdown--filter-dom" name="days_on_mkt" data-placeholder="Any">
                            <option></option>
                            <option value="1 day">1 day</option> 
                            <option value="7 days">7 days</option> 
                            <option value="14 days">14 days</option>
                            <option value="1 month">1 month</option> 
                            <option value="3 months">3 months</option> 
                            <option value="6 months">6 month</option> 
                            <option value="1 year">1 year</option> 
                            <option value="2 years+">2 years+</option>
                        </select>
                    </section> -->

                    <!-- <section class="page-search__section page-search__section--tokenize" id="keywords" title="Keywords">
                        <h4>Keywords</h4>
                        <span class="helper">(seperate with commas)</span>
                        <input type="text" class="page-search__input page-search__input--tokenize" name="keywords"></input>
                    </section> -->

                </div>

                <div class="col">

                    <section class="page-search__section" id="yrsBuilt" title="Years Built">
                        <h4>Years Built</h4>
                        <div class="page-search__container page-search__container--range">
                            <input type="text" class="page-search__input page-search__input--numeric" name="yrs_built_min" placeholder="Min"></input>
                                &mdash;&nbsp;
                            <input type="text" class="page-search__input page-search__input--numeric" name="yrs_built_max" placeholder="Max">
                            </input>
                        </div>

                    </section>

                    <!-- <section class="page-search__section" id="findByMLS" title="Find by MLS">
                        <h4>Find by MLS</h4>
                        <input type="text" class="page-search__input page-search__input--text" name="mls_id"></input>
                    </section> -->

                </div>
            </div>
            </div>
        </form>
    </div>
</div>
<!-- Page Search -->
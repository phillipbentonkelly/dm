<?php $pageType = $_GET['page-type']; ?>

<!-- Page Search -->
<div class="page-search page-search__serp">
    <div class="page-search__content-wrapper">
        <form class="page-search__form">
            <div class="page-search__row">
                <input type="search" name="q" class="page-search__search-text" placeholder="Search for real estate listings or articles. ex: 3 bedroom for sale in Brookline under 1,000,000" />

                <div class="page-search__radio-container page-search__radio-container--serp">
                    <div class="page-search__fancy-radio-box page-search__fancy-radio-box--for-sale">
                        <input type="radio" id="forSale" name="buy_or_rent" value="ForSale" checked="checked" />
                        <label for="forSale" class="for-sale">For Sale</label>
                    </div>

                    <div class="page-search__fancy-radio-box page-search__fancy-radio-box--for-rent">
                        <input type="radio" id="forRent" name="buy_or_rent" value="ForRent" checked="checked" /> 
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

                <select class="page-search__dropdown page-search__dropdown--filter" id="moreOptions" name="more_options">More (4)
                </select>

                <button class="page-search__button page-search__button--save-search" value="">
                    <span>Save Search</span>
                </button>

                <button class="page-search__button page-search__button--submit" value=""></button>
            </div>
            
            <?php if ($pageType == 'serp') { ?>
                <div class="page-search__menu-panel" id="moreOptionsPanel">
                    <div class="page-search__row">
                        <div class="page-search__button--close"></div>

                        <div class="col">
                            <section class="filters-list">
                                <h4>Filter By</h4>
                                <ul>
                                    <li><input type="checkbox" id="openHouses" name="open_houses" />
                                        <label for="openHouses">Open Houses</label>
                                    </li>

                                    <li><input type="checkbox" id="newListings" name="new_listings" />
                                        <label for="newListings">New Listings</label>
                                    </li>

                                    <li><input type="checkbox" id="reducedPrice" name="reduced_price" />
                                        <label for="reducedPrice">Reduced Price</label>
                                    </li>

                                    <li><input type="checkbox" id="newDevelopments" name="new_developments" />
                                        <label for="newDevelopments">New Developments</label>
                                    </li>

                                    <li><input type="checkbox" id="sold" name="sold" />
                                        <label for="sold">Sold</label>
                                    </li>

                                    <li><input type="checkbox" id="forclosures" name="forclosures" />
                                        <label for="forclosures">Forclosures</label>
                                    </li>
                                </ul>
                            </section>
                        </div>

                        <div class="col">
                            <section id="sqFt">
                                <h4>Square Feet</h4>
                                <input type="text" class="page-search__input-numeric" name="sq_ft_min" placeholder="Min" />&nbsp;&dash;&nbsp;<input type="text" class="page-search__input-numeric" name="sq_ft_max" placeholder="Max" />
                            </section>

                            <section id="lotSz">
                                <h4>Lot Size</h4>
                                <input type="text" class="page-search__input-numeric" name="lot_sz_min" placeholder="Min" />&nbsp;&dash;&nbsp;<input type="text" class="page-search__input-numeric" name="lot_sz_max" placeholder="Max" />
                            </section>

                            <section id="yrsBuilt" title="Years Built">
                                <h4>Years Built</h4>
                                <input type="text" class="page-search__input-numeric" name="yrs_built_min" placeholder="Min" />&nbsp;&dash;&nbsp;<input type="text" class="page-search__input-numeric" name="yrs_built_max" placeholder="Max" />
                            </section>
                        </div>

                        <div class="col">
                            <section id="daysOnMkt" title="Days On Market">
                                <h4>Days On Market</h4>

                                <select class="page-search__dropdown" name="days_on_mkt">
                                    <option></option>
                                </select>
                            </section>

                            <section id="keywords" title="Keywords">
                                <h4>Keywords</h4>
                                <input type="text" />
                            </section>
                        </div>

                        <div class="col">
                            <section id="findByMLS" title="Find by MLS">
                                <h4>Find by MLS</h4>
                                <input type="search" />
                            </section>
                        </div>
                    </div>
                </div>
            <?php } ?>
        </form>
    </div>
</div>
<!-- Page Search -->
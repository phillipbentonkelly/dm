<script>
    $(document).ready(function(){ 
        if('#listingDropDown'){
            $("#listingDropDown").select2({ dropdownCssClass: 'mplistings-dropdown' });
        }
    });
</script>

<!-- Property Listings Widget -->
<div class="mplistings">
    <h4>Property Listings</h4>
    
    <select id="listingDropDown">
        <option value="All">All</option>
        <option value="New">New</option>
        <option value="Open Houses">Open Houses</option>
        <option value="Luxury">Luxury</option>
        <option value="My Listings">My Listings</option>
    </select>
    
    <div class="hScrollWrapper">
        <div class="scrollFadeWrapper">
            <div class="scrollWrapper">
                <div class="listing-container">
                    
                    <!-- Property -->
                    <div class="property template" data-href="{{curr_data.url}}">
                        <div class="top-level__details">
                            <span class="property__label__for-sale">{{purchase_type}}</span>
                            
                            <div class="property__bottom-overlay">
                                <span class="property__price">{{cur_data.price}}</span>
                                <span class="property__time">{{updated_at}}</span>
                            </div>

                            <img class="property__photo" data-src="{{image}}" />
                        </div>
                        
                        <div class="bottom-level__details">
                            <div class="property__address">{{location.address}}, {{location.locality}} {{location.region}}</div>
                            <div class="property__bed-and-baths row">
                                <div class="property__bedrooms col">{{cur_data.beds}} beds</div>
                                <div class="property__baths col">{{cur_data.baths}} baths</div>
                            </div>
                        </div>
                    </div>

                    <!-- Property -->
                    <div class="property">
                        <div class="top-level__details">
                            <span class="property__label__for-sale">For Sale</span>
                            
                            <div class="property__bottom-overlay">
                                <span class="property__price">$4,750,000</span>
                                <span class="property__time">9:43 AM</span>
                            </div>

                            <img class="property__photo" src="images/listings/ListingPhotos_Group1.jpg" />
                        </div>
                        
                        <div class="bottom-level__details">
                            <div class="property__address">353 Beacon Street Boston, MA</div>
                            <div class="property__bed-and-baths row">
                                <div class="property__bedrooms col">4 beds</div>
                                <div class="property__baths col">4.5 baths</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Property -->
                    <div class="property">
                        <div class="top-level__details">
                            <span class="property__label__for-sale">For Rent</span>
                            
                            <div class="property__bottom-overlay">
                                <span class="property__price">$649,900</span>
                                <span class="property__time">10:45 AM</span>
                            </div>

                            <img class="property__photo" src="images/listings/ListingPhotos_Group2.jpg" />
                        </div>
                        
                        <div class="bottom-level__details">
                            <div class="property__address">49 L Street, Boston, MA</div>
                            <div class="property__bed-and-baths row">
                                <div class="property__bedrooms col">2 beds</div>
                                <div class="property__baths col">2 baths</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Property -->
                    <div class="property">
                        <div class="top-level__details">
                            <span class="property__label__for-sale">For Sale</span>
                            
                            <div class="property__bottom-overlay">
                                <span class="property__price">$659,000</span>
                                <span class="property__time">10:43 AM</span>
                            </div>

                            <img class="property__photo" src="images/listings/ListingPhotos_Group3.jpg" />
                        </div>
                        
                        <div class="bottom-level__details">
                            <div class="property__address">251 Health Street Boston, MA</div>
                            <div class="property__bed-and-baths row">
                                <div class="property__bedrooms col">2 beds</div>
                                <div class="property__baths col">2 baths</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Property -->
                    <div class="property">
                        <div class="top-level__details">
                            <!--<span class="property__label__for-sale">For Sale</span>
                            
                            <div class="property__bottom-overlay">
                                <span class="property__price">$4,750,000</span>
                                <span class="property__time">9:43 AM</span>
                            </div>-->

                            <img class="property__photo" src="images/listings/ListingPhotos_Group4.jpg" />
                        </div>
                        
                        <div class="bottom-level__details">
                            <div class="property__address">99 Chesnut Hill Ave Boston, MA</div>
                            <div class="property__bed-and-baths row">
                                <div class="property__bedrooms col">2 beds</div>
                                <div class="property__baths col">2 baths</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Property -->
                    <div class="property">
                        <div class="top-level__details">
                            <span class="property__label__for-sale">For Sale</span>
                            
                            <div class="property__bottom-overlay">
                                <span class="property__price">$4,750,000</span>
                                <span class="property__time">9:43 AM</span>
                            </div>

                            <img class="property__photo" src="images/listings/ListingPhotos_Group1.jpg" />
                        </div>
                        
                        <div class="bottom-level__details">
                            <div class="property__address">353 Beacon Street Boston, MA</div>
                            <div class="property__bed-and-baths row">
                                <div class="property__bedrooms col">4 beds</div>
                                <div class="property__baths col">4.5 baths</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Property -->
                    <div class="property">
                        <div class="top-level__details">
                            <span class="property__label__for-sale">For Rent</span>
                            
                            <div class="property__bottom-overlay">
                                <span class="property__price">$649,900</span>
                                <span class="property__time">10:45 AM</span>
                            </div>

                            <img class="property__photo" src="images/listings/ListingPhotos_Group2.jpg" />
                        </div>
                        
                        <div class="bottom-level__details">
                            <div class="property__address">49 L Street, Boston, MA</div>
                            <div class="property__bed-and-baths row">
                                <div class="property__bedrooms col">2 beds</div>
                                <div class="property__baths col">2 baths</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Property -->
                    <div class="property">
                        <div class="top-level__details">
                            <span class="property__label__for-sale">For Sale</span>
                            
                            <div class="property__bottom-overlay">
                                <span class="property__price">$659,000</span>
                                <span class="property__time">10:43 AM</span>
                            </div>

                            <img class="property__photo" src="images/listings/ListingPhotos_Group3.jpg" />
                        </div>
                        
                        <div class="bottom-level__details">
                            <div class="property__address">251 Health Street Boston, MA</div>
                            <div class="property__bed-and-baths row">
                                <div class="property__bedrooms col">2 beds</div>
                                <div class="property__baths col">2 baths</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Property -->
                    <div class="property">
                        <div class="top-level__details">
                            <span class="property__label__for-sale">For Sale</span>
                            
                            <div class="property__bottom-overlay">
                                <span class="property__price">$4,750,000</span>
                                <span class="property__time">9:43 AM</span>
                            </div>

                            <img class="property__photo" src="images/listings/ListingPhotos_Group4.jpg" />
                        </div>
                        
                        <div class="bottom-level__details">
                            <div class="property__address">99 Chesnut Hill Ave Boston, MA</div>
                            <div class="property__bed-and-baths row">
                                <div class="property__bedrooms col">2 beds</div>
                                <div class="property__baths col">2 baths</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Property -->
                    <div class="property">
                        <div class="top-level__details">
                            <span class="property__label__for-sale">For Sale</span>
                            
                            <div class="property__bottom-overlay">
                                <span class="property__price">$4,750,000</span>
                                <span class="property__time">9:43 AM</span>
                            </div>

                            <img class="property__photo" src="images/listings/ListingPhotos_Group1.jpg" />
                        </div>
                        
                        <div class="bottom-level__details">
                            <div class="property__address">353 Beacon Street Boston, MA</div>
                            <div class="property__bed-and-baths row">
                                <div class="property__bedrooms col">4 beds</div>
                                <div class="property__baths col">4.5 baths</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Property -->
                    <div class="property">
                        <div class="top-level__details">
                            <span class="property__label__for-sale">For Rent</span>
                            
                            <div class="property__bottom-overlay">
                                <span class="property__price">$649,900</span>
                                <span class="property__time">10:45 AM</span>
                            </div>

                            <img class="property__photo" src="images/listings/ListingPhotos_Group2.jpg" />
                        </div>
                        
                        <div class="bottom-level__details">
                            <div class="property__address">49 L Street, Boston, MA</div>
                            <div class="property__bed-and-baths row">
                                <div class="property__bedrooms col">2 beds</div>
                                <div class="property__baths col">2 baths</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Property -->
                    <div class="property">
                        <div class="top-level__details">
                            <span class="property__label__for-sale">For Rent</span>
                            
                            <div class="property__bottom-overlay">
                                <span class="property__price">$649,900</span>
                                <span class="property__time">10:45 AM</span>
                            </div>

                            <img class="property__photo" src="images/listings/ListingPhotos_Group2.jpg" />
                        </div>
                        
                        <div class="bottom-level__details">
                            <div class="property__address">49 L Street, Boston, MA</div>
                            <div class="property__bed-and-baths row">
                                <div class="property__bedrooms col">2 beds</div>
                                <div class="property__baths col">2 baths</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="fade-overlay"></div>
        </div>
    </div>

    <div class="navigation">
        <a href="javascript:;" id="leftArrow" title="DOWN"><img class='nav-arrow' src='images/listings/arrow-icon-yellow.png'></a>
        <a href="javascript:;" class="view-all">View All <span class="listingType">New</span> Listings</a>
        <a href="javascript:;" id="rightArrow" title="UP"><img class='nav-arrow' src='images/listings/arrow-icon-yellow.png'></a>
    </div>
</div>
<!-- Property Listings Widget -->
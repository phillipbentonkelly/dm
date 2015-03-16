// Catalog of DFP ad slots

var bcom = bcom || {};
bcom.dfp = bcom.dfp || {};

bcom.dfp.adCatalog = [
  {
    name: 'ad_bigbox1',
    size: [[300,250]],
    position: ['atf', 'bigbox1']
  },
  {
    name: 'ad_bigbox2',
    size: [[300,250]],
    position: ['btf', 'bigbox2']
  },
  {
    name: 'ad_bigbox3',
    size: [[300,250]],
    position: ['btf', 'bigbox3']
  },
  {
    name: 'ad_bigbox4',
    size: [[300,250]],
    position: ['btf', 'bigbox4']
  },
  {
    name: 'ad_bigbox5',
    size: [[300,250]],
    position: ['btf', 'bigbox5']
  },
  {
      name: 'ad_bigbox6',
      size: [[300,250]],
      position: ['btf', 'bigbox6']
  },
  {
      name: 'ad_carousel1',
      size: [[960,580],[287,213]],
      sizeByBreakpoint: {
    mobile: [[287,213]],
    tablet: [[960,580]],
    desktop: [[960,580]]
      },
      position: ['atf', 'carousel1']
  },
  {
      name: 'ad_carousel2',
      size: [[960,580],[287,213]],
      sizeByBreakpoint: {
          mobile: [[287,213]],
          tablet: [[960,580]],
          desktop: [[960,580]]
      },
      position: 'carousel2'
  },
  {
      name: 'ad_carousel3',
      size: [[960,580],[287.213]],
      sizeByBreakpoint: {
          mobile: [[287,213]],
          tablet: [[960,580]],
          desktop: [[960,580]]
      },
      position: 'carousel3'
  },
  {
      name: 'ad_lead1',
      size: [[728,90],[320,50]],
      sizeByBreakpoint: {
    mobile: [[320,50]],
    tablet: [[728,90]],
    desktop: [[728,90]]
      },
      position: ['atf', 'lead1'],
      refresher: true
  },
  {
      name: 'ad_lead2',
      size: [[728,90],[320,50]],
      sizeByBreakpoint: {
    mobile: [[320,50]],
    tablet: [[728,90]],
    desktop: [[728,90]]
      },
      position: ['btf','lead2']
  },
  {
      name: 'ad_spotlight1',
      size: [[460,184],[320,50]],
      sizeByBreakpoint: {
          mobile: [[320,50]],
          tablet: [[460,184]],
          desktop: [[460,184]]
      },
      position: ['atf', 'spotlight1']
  },
  {
      name: 'ad_spotlight2',
      size: [[460,184],[320,50]],
      sizeByBreakpoint: {
          mobile: [[320,50]],
          tablet: [[460,184]],
          desktop: [[460,184]]
      },
      position: ['atf', 'spotlight2']
  },
  {
      name: 'ad_spotlight3',
      size: [[460,184],[320,50]],
      sizeByBreakpoint: {
          mobile: [[320,50]],
          tablet: [[460,184]],
          desktop: [[460,184]]
      },
      position: ['btf', 'spotlight3']
  },
  {
      name: 'ad_spotlight4',
      size: [[460,184],[320,50]],
      sizeByBreakpoint: {
          mobile: [[320,50]],
          tablet: [[460,184]],
          desktop: [[460,184]]
      },
      position: ['btf', 'spotlight4']
  },
  {
      name: 'ad_toprightslot',
      size: [[300,250]],
      position: ['atf', 'toprightslot']
  },
  {
      name: 'ad_t6',
      size: [[630,320],[300,130]],
      sizeByBreakpoint: {
          mobile: [[300,130]],
          tablet: [[630,320]],
          desktop: [[630,320]]
      },
      position: 't6'
  }
];



// Out of page catalog
bcom.dfp.adCatalogOOP = [
  {
    name: 'ad_outofpage1',
    size: [[1,1]],
    position: 'outofpage'
  },
  {
    name: 'ad_outofpage2',
    size: [[1,1]],
    position: 'billboard'
  },
  {
    name: 'ad_outofpage3',
    size: [[1,1]],
    position: ['backtile','atf']
  }
];
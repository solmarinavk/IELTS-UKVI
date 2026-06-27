// Authored by hand (positioning-sensitive): 3 maps + 3 mixed/combination charts,
// each with a band 8-9 model answer consistent with the visual.

export const MAPS = [
  {
    title: 'Tourist development of a small island',
    visualDescription: 'a small island before and after the construction of tourist facilities',
    map: {
      beforeLabel: 'Before development',
      afterLabel: 'After development',
      before: [
        { shape: 'water', x: 0, y: 0, w: 100, h: 100, label: 'Sea' },
        { shape: 'sand', x: 20, y: 26, w: 60, h: 48, label: '' },
        { shape: 'park', x: 30, y: 34, w: 40, h: 32, label: 'Trees' },
        { shape: 'tree', x: 33, y: 38, w: 6, h: 6 },
        { shape: 'tree', x: 58, y: 40, w: 6, h: 6 },
        { shape: 'tree', x: 45, y: 56, w: 6, h: 6 },
      ],
      after: [
        { shape: 'water', x: 0, y: 0, w: 100, h: 100, label: 'Sea' },
        { shape: 'sand', x: 20, y: 26, w: 60, h: 48, label: '' },
        { shape: 'building', x: 26, y: 31, w: 16, h: 10, label: 'Hotel' },
        { shape: 'building', x: 50, y: 31, w: 16, h: 10, label: 'Hotel' },
        { shape: 'road', x: 30, y: 47, w: 40, h: 4, label: '' },
        { shape: 'building', x: 28, y: 53, w: 14, h: 9, label: 'Restaurant' },
        { shape: 'building', x: 52, y: 53, w: 14, h: 9, label: 'Reception' },
        { shape: 'road', x: 47, y: 70, w: 6, h: 22, label: 'Pier' },
        { shape: 'water', x: 62, y: 64, w: 14, h: 9, label: 'Swimming' },
      ],
    },
    modelAnswer:
      'The two maps illustrate how a previously undeveloped island was transformed following the construction of tourist facilities.\n\nOverall, the island changed from an entirely natural area, covered in trees and surrounded by sea, into a purpose-built holiday resort with accommodation, dining and access to the water. Despite this development, the basic shape of the island and much of its perimeter were preserved.\n\nBefore the development, the centre of the island was dominated by a large cluster of trees, and there were no buildings or roads of any kind. In contrast, after the development, two hotels were constructed in the northern half of the island, connected to a restaurant and a reception building by a newly built footpath running east to west.\n\nIn addition, a pier was built on the southern coast, extending into the sea to allow boats to dock, while a designated swimming area was established off the eastern shore. Most of the original vegetation was removed to make room for these new amenities.',
  },
  {
    title: 'Changes to the village of Stokeford',
    visualDescription: 'the village of Stokeford in 1980 and in 2020',
    map: {
      beforeLabel: '1980',
      afterLabel: '2020',
      before: [
        { shape: 'water', x: 0, y: 84, w: 100, h: 16, label: 'River' },
        { shape: 'road', x: 0, y: 44, w: 100, h: 6, label: 'Main Road' },
        { shape: 'building', x: 8, y: 18, w: 24, h: 16, label: 'Large house' },
        { shape: 'park', x: 40, y: 12, w: 50, h: 26, label: 'Farmland' },
        { shape: 'park', x: 6, y: 56, w: 42, h: 22, label: 'Farmland' },
        { shape: 'building', x: 60, y: 56, w: 18, h: 16, label: 'Shops' },
      ],
      after: [
        { shape: 'water', x: 0, y: 84, w: 100, h: 16, label: 'River' },
        { shape: 'road', x: 0, y: 44, w: 100, h: 6, label: 'Main Road' },
        { shape: 'building', x: 8, y: 18, w: 24, h: 16, label: 'Retirement\nhome' },
        { shape: 'building', x: 42, y: 14, w: 20, h: 11, label: 'Houses' },
        { shape: 'building', x: 66, y: 14, w: 22, h: 11, label: 'Houses' },
        { shape: 'building', x: 6, y: 56, w: 18, h: 16, label: 'Houses' },
        { shape: 'road', x: 28, y: 50, w: 4, h: 28, label: '' },
        { shape: 'building', x: 60, y: 56, w: 18, h: 16, label: 'Shops' },
      ],
    },
    modelAnswer:
      'The two maps compare the village of Stokeford as it appeared in 1980 with the same area in 2020.\n\nOverall, the village became considerably more residential over the forty-year period, as areas of farmland were replaced by housing. While the main road, the river and the shops remained unchanged, the most striking development was the conversion of open land into homes.\n\nIn 1980, a large house stood to the north of the main road, surrounded by a substantial garden, and extensive farmland occupied the land to its east. To the south of the road, there was further farmland alongside a row of shops near the river.\n\nBy 2020, the large house had been converted into a retirement home, and the farmland that once surrounded it had been built over with numerous houses. Similarly, the farmland to the south was replaced by housing, served by a new road leading down towards the river. The shops, however, were retained in their original position throughout this period.',
  },
  {
    title: 'Redevelopment of an industrial site',
    visualDescription: 'an industrial site in 2000 and its redevelopment in the present day',
    map: {
      beforeLabel: '2000',
      afterLabel: 'Present day',
      before: [
        { shape: 'building', x: 8, y: 14, w: 36, h: 30, label: 'Factory' },
        { shape: 'building', x: 54, y: 16, w: 32, h: 22, label: 'Warehouse' },
        { shape: 'road', x: 0, y: 52, w: 100, h: 6, label: 'Main Road' },
        { shape: 'road', x: 10, y: 64, w: 78, h: 26, label: 'Car park' },
      ],
      after: [
        { shape: 'park', x: 8, y: 12, w: 40, h: 34, label: 'Park' },
        { shape: 'tree', x: 14, y: 18, w: 7, h: 7 },
        { shape: 'tree', x: 34, y: 20, w: 7, h: 7 },
        { shape: 'tree', x: 22, y: 34, w: 7, h: 7 },
        { shape: 'building', x: 54, y: 13, w: 14, h: 12, label: 'Flats' },
        { shape: 'building', x: 72, y: 13, w: 14, h: 12, label: 'Flats' },
        { shape: 'building', x: 54, y: 30, w: 32, h: 13, label: 'Shopping centre' },
        { shape: 'road', x: 0, y: 52, w: 100, h: 6, label: 'Main Road' },
        { shape: 'water', x: 10, y: 64, w: 38, h: 22, label: 'Lake' },
        { shape: 'building', x: 54, y: 64, w: 32, h: 22, label: 'Sports centre' },
      ],
    },
    modelAnswer:
      'The two maps depict the same industrial site as it was in the year 2000 and how it has been redeveloped at the present time.\n\nOverall, the area was completely transformed from a functional industrial zone into a modern residential and leisure district, with green and recreational spaces replacing the former workplaces and parking. The main road across the centre of the site was the only feature to remain unchanged.\n\nIn 2000, a large factory occupied the north-western corner, with a warehouse to its east, while the entire southern half of the site was taken up by an extensive car park.\n\nAt present, the factory has been demolished and the land converted into a public park dotted with trees. The warehouse was replaced by two blocks of flats and a shopping centre. To the south, the car park made way for a lake on one side and a sports centre on the other, giving residents access to both natural and recreational amenities.',
  },
]

export const MIXED = [
  {
    title: 'Tourism in a coastal city',
    visualDescription:
      'the number of visitors to three attractions and total tourism revenue in a coastal city between 2012 and 2020',
    mixed: {
      charts: [
        {
          kind: 'bar',
          title: 'Number of visitors to three attractions (millions)',
          chart: {
            xLabel: 'Year', yLabel: 'Visitors', unit: 'millions',
            categories: ['2012', '2016', '2020'],
            series: [
              { name: 'Harbour Museum', values: [1.2, 1.8, 2.6] },
              { name: 'Old Castle', values: [2.0, 2.4, 2.9] },
              { name: 'Botanical Gardens', values: [0.8, 1.5, 2.3] },
            ],
          },
        },
        {
          kind: 'line',
          title: 'Total tourism revenue (£ billion)',
          chart: {
            xLabel: 'Year', yLabel: 'Revenue', unit: '£bn',
            categories: ['2012', '2014', '2016', '2018', '2020'],
            series: [{ name: 'Revenue', values: [1.4, 1.9, 2.5, 3.2, 4.1] }],
          },
        },
      ],
    },
    modelAnswer:
      'The bar chart shows the number of visitors to three attractions in a coastal city, while the line graph illustrates the city’s total tourism revenue, both between 2012 and 2020.\n\nOverall, all three attractions experienced steady growth in visitor numbers over the period, and this was accompanied by a continuous and substantial rise in total tourism revenue, which roughly tripled.\n\nIn 2012, the Old Castle was the most popular attraction, drawing 2 million visitors, compared with 1.2 million at the Harbour Museum and just 0.8 million at the Botanical Gardens. By 2020, all three had grown markedly: the Old Castle reached 2.9 million, while the Harbour Museum and Botanical Gardens climbed to 2.6 and 2.3 million respectively, narrowing the gap between them.\n\nThis upward trend in visitors was mirrored by tourism revenue, which increased every year from £1.4 billion in 2012 to £4.1 billion in 2020. The steepest growth occurred after 2016, indicating that each additional visitor generated greater spending.',
  },
  {
    title: 'Household energy use and costs',
    visualDescription:
      'how energy is used in an average home and the average annual energy bill in four countries',
    mixed: {
      charts: [
        {
          kind: 'pie',
          title: 'Household energy use by purpose (%)',
          pie: {
            unit: '%',
            charts: [
              {
                label: 'Average home',
                slices: [
                  { label: 'Heating', value: 42 },
                  { label: 'Water heating', value: 18 },
                  { label: 'Appliances', value: 16 },
                  { label: 'Lighting', value: 12 },
                  { label: 'Cooking', value: 7 },
                  { label: 'Other', value: 5 },
                ],
              },
            ],
          },
        },
        {
          kind: 'table',
          title: 'Average annual energy bill (£)',
          table: {
            unit: '£ per year',
            columns: ['2010', '2020'],
            rows: [
              { label: 'Country A', values: [820, 1190] },
              { label: 'Country B', values: [640, 980] },
              { label: 'Country C', values: [1100, 1350] },
              { label: 'Country D', values: [540, 870] },
            ],
          },
        },
      ],
    },
    modelAnswer:
      'The pie chart shows how energy is consumed in an average home, while the table presents the average annual household energy bill in four countries in 2010 and 2020.\n\nOverall, space heating is by far the largest use of domestic energy, and energy bills rose considerably in every country over the decade, although the size of the increase varied.\n\nAccording to the pie chart, heating alone accounts for 42% of household energy use, and together with water heating it makes up 60% of the total. Appliances and lighting consume a further 16% and 12% respectively, whereas cooking and other uses are comparatively minor, at 7% and 5%.\n\nThe table reveals that bills increased in all four countries between 2010 and 2020. Country C remained the most expensive, rising from £1,100 to £1,350, while Country D stayed the cheapest despite climbing from £540 to £870. The sharpest proportional rise occurred in Country A, where costs jumped by £370 to reach £1,190.',
  },
  {
    title: 'Waste recycling trends',
    visualDescription:
      'the proportion of waste recycled by material and the total amount of waste generated in a country',
    mixed: {
      charts: [
        {
          kind: 'bar',
          title: 'Proportion of waste recycled by material (%)',
          chart: {
            xLabel: 'Material', yLabel: 'Recycled', unit: '%',
            categories: ['Paper', 'Glass', 'Plastic', 'Metal'],
            series: [
              { name: '2005', values: [45, 38, 12, 30] },
              { name: '2020', values: [72, 65, 34, 58] },
            ],
          },
        },
        {
          kind: 'line',
          title: 'Total waste generated (million tonnes)',
          chart: {
            xLabel: 'Year', yLabel: 'Waste', unit: 'm tonnes',
            categories: ['2005', '2010', '2015', '2020'],
            series: [{ name: 'Total waste', values: [32, 30, 27, 24] }],
          },
        },
      ],
    },
    modelAnswer:
      'The bar chart compares the proportion of four materials that were recycled in 2005 and 2020, while the line graph shows the total amount of waste generated over the same period.\n\nOverall, recycling rates improved substantially for every material, and at the same time the total quantity of waste produced fell steadily, suggesting more sustainable consumption.\n\nIn 2005, paper had the highest recycling rate at 45%, followed by glass at 38% and metal at 30%, whereas only 12% of plastic was recycled. By 2020, every figure had risen markedly: paper recycling reached 72% and glass 65%, while metal climbed to 58%. Plastic, though still the lowest, almost tripled to 34%.\n\nMeanwhile, the total waste generated declined continuously from 32 million tonnes in 2005 to 24 million tonnes in 2020. The reduction was gradual but consistent across each five-year interval, reinforcing the overall picture of a country both producing less waste and recycling a far greater share of it.',
  },
]

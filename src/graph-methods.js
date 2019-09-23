import * as d3 from 'd3';
import data_file from './data/test_app.csv'


export const getFilteredData = (group) => {

  const prom = new Promise(
    function (resolve, reject) {
      d3.csv(data_file).then(data => {
        if (group) {
          const filtered = data.filter(d => d.app_stage == group)
          resolve(filtered);
        } else {
          resolve(data);
        }
      })
    }
  )

  return prom;

}

export const init = (props) => {

  const { svg, margin, set } = props;

  // read data from given file
  d3.csv(data_file).then((data) => {
    draw({
      data: data,
      svgName: svg,
      margin: margin,
      set: set
    })
  })

}

const parseData = (data) => {

  data.forEach(d => {
    d.x = +d.x;
    d.y = +d.y;
    d.app_stage = +d.app_stage;
  })

  return data;
}

export const draw = (props) => {
  var { data, svgName, margin } = props;
  const svg = d3.select(svgName);
  const width = Math.round(+svg.style('width').replace('px', '')) - margin.left - margin.right;
  const height = Math.round(+svg.style('height').replace('px', '')) - margin.top - margin.bottom;

  data = parseData(data);

  // console.log("draw data: ", data);
  // console.log('svgName: ', svgName);
  // console.log('margin: ', margin);
  // console.log('height: ', height);
  // console.log('width: ', width);

  const xScale = d3.scaleLinear()
  xScale
    .domain([0, 1000])
    .range([margin.left, width])

  const yScale = d3.scaleLinear()
  yScale
    .domain([0, 1000])
    .range([margin.top, height])

  let circles = svg.selectAll('.data-circle')
    .data(data)



  svg.selectAll('circle').remove();

  circles.enter().append('circle')
    .merge(circles)
    .style("fill", d => {
      if (d.app_stage === 1) {
        return '#BF0426';
      } else {
        return "#592F56"
      }
    })
    .attr("cx", d => xScale(d.x))
    .attr("cy", d => yScale(d.y))
    .transition()
    .duration(200)
    .attr("r", 20)

  circles.exit().remove();


}
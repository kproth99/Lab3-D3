
d3.csv("cities.csv", d3.autoType).then((data) => {
    console.log("cities", data);
    data = data.filter((d) => d.eu === true);

    console.log("cities", data);
    d3.select(".city-count").text(data.length);
    const width = 700;
    const height = 550;
    const svg = d3
      .select(".population-plot")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
      svg
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => d.x)
        .attr("cy", (d, i) => d.y)
        .attr("r", function(d){
          if(d.population > 1000000){
            return 8;
          }
          else{
            return 4;
          }
        })
        .attr("fill", "MediumPurple");
  
     svg
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", (d, i) => d.x)
        .attr("y", (d, i) => d.y)
        .text(function(d){
          if(d.population > 1000000){
            return d.country;
          }
          else{
            return;
          }
        })
        .attr("dy", -11)
        .attr("text-anchor", (d) => "middle")
        .attr("font-size", (d) => 11)
      });
  
  d3.csv("buildings.csv", d3.autoType).then((data) => {
    data.sort((a, b) => b.height_ft - a.height_ft);
    console.log("buildings", data);
    const width = 500;
    const height = 500;
    const svg = d3
      .select(".buildingcharts")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
  
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", 170)
      .attr("class", "rect")
      .attr("y", (d, i) => i * 50)
      .attr("width", (d, i) => d.height_px)
      .attr("height", 40)
      .attr("fill", "MediumSlateBlue")
  
      .on("click", (event, d) => {document.querySelector(".image").src = "img/" + d.image; //this goes into the library 
      //csv and pulls the image then gives in the 
        d3.select(".buildingname").text(d.building);
        d3.select(".height").text(d.height_ft);
        d3.select(".city").text(d.city);
        d3.select(".country").text(d.country);
        d3.select(".floors").text(d.floors);
        d3.select(".completed").text(d.completed);
      });
  
    svg
      .selectAll("text.building")
      .data(data)
      .enter()
      .append("text")
      .attr("x", 165)
      .attr("y", (d, i) => i * 50)
      .text((d) => d.building)
      .attr("font-size", 15)
      .attr("text-anchor", "end")
      .attr("dy", 24);
  
    svg
      .selectAll("text.height")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d,i) => d.height_px + 180)
      .attr("y", (d,i) => i * 50)
      .text((d) => d.height_ft + " Feet")
      .attr("text-anchor", "start")
      .attr("font-size", 12)
      .attr("dy", 24);
  });
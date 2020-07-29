console.log('networks.js')




// first make a sample array
var sampleData = d3.range(40);
console.log('range is ', sampleData)
// map the range into objects with some initial positions
sampleData = sampleData.map(()=>({'x0':Math.random()*500, 'y0':Math.random()*500, 'r' : 20}));
console.log('range is now ', sampleData)
// so now I have a list of objects with initial positions.  I can append circles to the svg
var gs = d3.select('svg')
                .selectAll('g')
                .data(sampleData)
                .enter()
                .append('g')
                .attr('transform',d=>`translate(${d.x0+','+d.y0})`)
                


//var txt = gs.append('text').text( (d,i)=>i)
                

links = []

for (var i = 0; i<sampleData.length; i++){
    var newLink = {}
    newLink['source'] = i;
    if (Math.random() > 0.2){
        newLink['target'] = Math.floor(Math.random() * i);
    }
    else {
        newLink['target'] = Math.min(i+1, sampleData.length-1)
    }
    newLink['dist'] = (10/sampleData.length);
    links.push(newLink)
}

var web = d3.select('svg')
            .selectAll('line')
            .data(links)
            .enter()
            .append('line')

var circs = gs.append('circle')
            .attr('r',d=>d.r)
            .attr('cx',0)
            .attr('cy',0)
            .style('fill', 'white')
            .style('stroke', 'red')


var sim = d3.forceSimulation(sampleData)
    .force('center', d3.forceCenter(250,250))
    .force('charge', d3.forceManyBody().strength(-10))
    .force('collide', d3.forceCollide(d=>d.r))
    .force('links', d3.forceLink(links).distance(d=>d.dist))
    .on('tick', ticked);

d3.select('svg').on('click', d=>sim.alpha(1))

var fc = d3.forceCenter(50,50)

function ticked(){
    var t = d3.selectAll('line')
                .attr('x1', d=>d.target.x)
                .attr('y1', d=>d.target.y)
                .attr('x2', d=>d.source.x)
                .attr('y2', d=>d.source.y)
                .attr('stroke', 'black')
                .style('stroke-width', '4px')
                .style('stroke-alpha', 0.5)

                u = d3.selectAll('g').attr('transform',d=>`translate(${d.x+','+d.y})`)
}

// ok so I'd actually try to apply this to my problem, using the nodes in the tree as my nodes and 


// lets practice the general update pattern.  Say I have some data:

var myData = [1,2,30,40,99,100];
myData = myData.map(d=>({'name':d, 'value':d*2}))

// create a div
var myDiv = d3.select("body").append('div').style("border", "1px solid green")

var ps = myDiv.selectAll('p').data(myData, d=>d.name).enter().append('p').text(d=>d.value)

// now change myData

myDiv.on('click', function(){

    var newNum = prompt('enter an index');
    console.log(newNum)
    var a = myData.splice(newNum,1)
    console.log(a)
    console.log(myData)

    ps.data(myData, d=>d.name).exit().remove()

})

const points = [];
const hull = []

let leftMost;
let currentVertex;
let currentPoints;
let index = 2;
let nextIndex = -1;
let nextVertx;

function setup() {
  createCanvas(500, 500);
  let buffer = 20
  for (let i = 0; i < 40; i++){
    points.push(createVector(random(buffer, width-buffer), random(buffer, height-buffer)));
  }
  
  points.sort((a,b) => a.x - b.x);
//  console.log(points)
  
  leftMost = points[0]
  currentVertex = leftMost;
  hull.push(currentVertex);

  nextVertex = points[1];
  index =2;
}

function draw() {
  background(0);
  
  stroke(255);
  strokeWeight(8);
  for (let p of points)
    point(p.x, p.y)
  
  
  stroke (0,0,255);
  fill(0,0,255,50);
  beginShape();
  for (let p of hull){
    vertex(p.x, p.y)
  }
  endShape(CLOSE)
  
  stroke(0, 255, 0);
  strokeWeight(32);
  point(leftMost.x, leftMost.y);
  
  stroke(200, 0, 255);
  strokeWeight(32);
  point(currentVertex.x, currentVertex.y);
  
  stroke(0,255,0);
  strokeWeight(2);
  line(currentVertex.x, currentVertex.y, nextVertex.x, nextVertex.y)
  
  stroke(255);
  strokeWeight(2);
  const a = p5.Vector.sub(nextVertex, currentVertex)
  const b = p5.Vector.sub(points[index], currentVertex)
  
  const cross = a.cross(b)
  if (cross.z < 0){
    nextVertex = points[index];
    nextIndex = index;
  }
  
  
  index = index + 1;
  
  if (index >= points.length){
    if (nextVertex == leftMost){
      console.log("Done");
      noLoop();
    } else 
    {
      hull.push(nextVertex)
      currentVertex = nextVertex;
      index = 0;
      nextVertex = leftMost
    }  
    
  }
}

//
//
// d3.json("bitcoin_price.json", function(data) {
//   console.log(data);
// });
// graph =
// d3.json("bitcoin_price.json", function(error, graph) {
//   var resources = graph.Resources;
//     for (var i = 0; i < resources.length; i++) {
//         var obj = resources[i]
//         for (var key in obj) {
//             console.log(key+"="+obj[key]);
//           }
//         }
//     });
//     <g transform="translate(0,0)">
//       <rect width="40" height="19"></rect>
//       <!-- <text x="37" y="9.5" dy=".35em">4</text> -->
//     </g>
//     <g transform="translate(0,20)">
//       <rect width="80" height="19"></rect>
//       <!-- <text x="77" y="9.5" dy=".35em">8</text> -->
//     </g>
//     <g transform="translate(0,40)">
//       <rect width="150" height="19"></rect>
//       <text x="147" y="9.5" dy=".35em">15</text>
//     </g>
//     <g transform="translate(0,60)">
//       <rect width="160" height="19"></rect>
//       <text x="157" y="9.5" dy=".35em">16</text>
//     </g>
//     <g transform="translate(0,80)">
//       <rect width="230" height="19"></rect>
//       <text x="227" y="9.5" dy=".35em">23</text>
//     </g>
//     <g transform="translate(0,100)">
//       <rect width="420" height="19"></rect>
//       <text x="417" y="9.5" dy=".35em">42</text>
//     </g>
//
//     d3.json("bitcoin_price.json", type, function(error, data) {
//       x.domain(marketcaps.map(function(d) { return d.name; }));
//       y.domain([0, d3.max(data, function(d) {
//         console.log(data);
//         return d.value;
//        })]);

var map;
      require([
        "esri/map", "esri/geometry/Extent",
        "esri/symbols/SimpleLineSymbol",
        "esri/layers/ArcGISDynamicMapServiceLayer", "esri/layers/FeatureLayer",
        "esri/InfoTemplate", "esri/renderers/DotDensityRenderer",
        "esri/renderers/ScaleDependentRenderer", "esri/dijit/Legend",
        "esri/Color", "dojo/_base/array", "dojo/dom", "dojo/domReady!"
      ], function(
        Map, Extent,
        SimpleLineSymbol,
        ArcGISDynamicMapServiceLayer, FeatureLayer,
        InfoTemplate, DotDensityRenderer,
        ScaleDependentRenderer, Legend,
        Color, array, dom
      ) {
        map = new Map("map", {
            basemap: "topo",
            center: [-94.75290067627297, 39.034671990514816],
            zoom: 3,
            sliderStyle: "small",
          });

        var basemap = new ArcGISDynamicMapServiceLayer("http://localhost:6080/arcgis/rest/services/confirm/MyMapService/MapServer");
        map.addLayer(basemap);

        var layer = new FeatureLayer("http://localhost:6080/arcgis/rest/services/confirm/MyMapService/MapServer/0", {
          outFields: ["CONFIRM_", "CNTRY_NAME"],
          infoTemplate: new InfoTemplate("${CNTRY_NAME}", "Confirm Counts: ${CONFIRM_}"),
            mode: FeatureLayer.MODE_ONDEMAND,
            outFields: ["*"],
            color: new Color([255, 255, 255, 50])
        });
        // layer.setOpacity(0.5);


        // var renderer = new DotDensityRenderer({
        //     backgroundColor: new Color("#FFFFFF"),
        //     outline: new SimpleLineSymbol().setColor(new Color([0, 0, 255, 0.1])),
        //     fields: [{
        //         name: "CONFIRM_",
        //         color: new Color("#ff0000"),
        //         dotShape: "circle",
        //         dotValue: 1000,
        //         dotSize: 3,
        //     }],
        // });
          var renderer = new ScaleDependentRenderer({
          rendererInfos: [{
            renderer: new DotDensityRenderer({
                backgroundColor: new Color("#FFFFFF"),
            outline: new SimpleLineSymbol().setColor(new Color([0, 0, 255, 0.1])),
              fields: [{
                name: "CONFIRM_",
                color: new Color("#FF0000")
              }],
              dotValue: 10000,
              dotSize: 1
            }),
          maxScale: 40000000,
          minScale: 80000000
          }, {
            renderer: new DotDensityRenderer({
                backgroundColor: new Color("#FFFFFF"),
            outline: new SimpleLineSymbol().setColor(new Color([0, 0, 255, 0.1])),
              fields: [{
                name: "CONFIRM_",
                color: new Color("#FF0000")
              }],
              dotValue: 5000,
              dotSize: 2
            }),
          maxScale: 20000001,
          minScale: 40000000
          },{
            renderer: new DotDensityRenderer({
                backgroundColor: new Color("#FFFFFF"),
            outline: new SimpleLineSymbol().setColor(new Color([0, 0, 255, 0.1])),
              fields: [{
                name: "CONFIRM_",
                color: new Color("#FF0000")
              }],
              dotValue: 3200,
              dotSize: 2
            }),
          maxScale: 17000000,
          minScale: 20000001
          }, {
            renderer: new DotDensityRenderer({
                backgroundColor: new Color("#FFFFFF"),
            outline: new SimpleLineSymbol().setColor(new Color([0, 0, 255, 0.1])),
              fields: [{
                name: "CONFIRM_",
                color: new Color("#FF0000")
              }],
              dotValue: 1600,
              dotSize: 4
            }),
          maxScale: 8500000,
          minScale: 17000000
          }, {
            renderer: new DotDensityRenderer({
                backgroundColor: new Color("#FFFFFF"),
            outline: new SimpleLineSymbol().setColor(new Color([0, 0, 255, 0.1])),
              fields: [{
                name: "CONFIRM_",
                color: new Color("#FF0000")
              }],
              dotValue: 800,
              dotSize: 6
            }),
          maxScale: 5000000,
          minScale: 8500000
          }]
        });
        layer.setRenderer(renderer);
        map.addLayers([layer]);


        map.on("layers-add-result", function(e) {
          var corn = e.layers[0].layer;
          var legend = new Legend({
            map: map,
            layerInfos: [{
              layer: corn,
              title: "疫情分布点密度"
            }]
          }, "legend");
          legend.startup();
        });
      });
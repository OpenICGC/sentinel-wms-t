// Import CSS from Leaflet and plugins.
import "leaflet/dist/leaflet.css";
import "leaflet-timedimension/dist/leaflet.timedimension.control.css";

import "leaflet";
import "leaflet-timedimension";
import "leaflet-hash";
import dateFormat from "dateformat";

export default function createMap() {
	const map = new L.Map("map", {
		zoom: 10,
		fullscreenControl: true,
		timeDimension: true,
		timeDimensionOptions: {
			period: "P1M",
		},
		center: [41.705, 1.588],
	});
	
	L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}.png', {
		attribution: '&copy; <a href="http://www.esri.com">ESRI</a>'
	}).addTo(map);

	var hash = new L.Hash(map);

	L.Control.TimeDimensionCustom = L.Control.TimeDimension.extend({
		_getDisplayDateFormat: function(date){
			return dateFormat(date, "yyyy-mm");
		}
	});

	var timeDimensionControl = new L.Control.TimeDimensionCustom({
		playerOptions: {
			buffer: 1,
			minBufferReady: -1
		}
	});

	map.addControl(timeDimensionControl);

	var icgcSentinelWms = "http://geoserveis.icgc.cat/icgc_sentinel2/wms/service?";
	var icgcSentinel = L.tileLayer.wms(icgcSentinelWms, {
		layers: 'sen2rgb',
		version: '1.3.0',
		format: 'image/png',
		transparent: true,
		attribution: 'ICGC'
	});

	L.TimeDimension.Layer.WMSCustom = L.TimeDimension.Layer.WMS.extend({
		_createLayerForTime:function(time){
			var wmsParams = this._baseLayer.options;
			wmsParams.time = dateFormat(new Date(time), "yyyy-mm");
			return new this._baseLayer.constructor(this._baseLayer.getURL(), wmsParams);
		},
	});

	// Create and add a TimeDimension Layer to the map
	var testTimeLayer = new L.TimeDimension.Layer.WMSCustom(icgcSentinel, {
		updateTimeDimension: true,
		requestTimeFromCapabilities: true,
		setDefaultTime: true,
		period: "P1M",
	});
	testTimeLayer.addTo(map);

	return map;
}

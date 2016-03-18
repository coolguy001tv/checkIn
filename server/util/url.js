/**
 * 链接封装对象
 * @class URL
 * @constructor
 * User: lizihan
 * Date: 13-05-13
 * Time: 17:10
 */
var URL = function() {
	this.initialize.apply(this, arguments);
};

URL.prototype = {
	/**
	 * 原始链接
	 * @attribute _source
	 * @protected
	 * @type {String}
	 * @default ""
	 */
	_source:"",
	/**
	 * 链接地址（无参数）
	 * @attribute _source
	 * @protected
	 * @type {String}
	 * @default ""
	 */
	_url:"",
	/**
	 * 参数信息
	 * @attribute _query
	 * @protected
	 * @type {Object}
	 * @default null
	 */
	_query:{},
	/**
	 * 锚点信息
	 * @attribute _anchor
	 * @protected
	 * @type {String}
	 * @default null
	 */
	_anchor:null,
	/**
	 * 初始化方法
	 * @method initialize
	 * @param {Object} value
	 * @return this
	 */
	initialize:function(value) {
		value = value || "";
		this._source = value;
		this._url = value;
		this._query = {};
		this.parse();

		return this;
	},
	/**
	 * 解析链接数据
	 * @method parse
	 * @param {Object} value
	 * @return this
	 */
	parse:function(value) {
		if(value) {
			this._source = value;
			this._url = value;
		}

		this.parseAnchor();
		this.parseParam();

		return this;
	},
	/**
	 * 解析锚点信息
	 * @method parseAnchor
	 * @return this
	 */
	parseAnchor:function() {
		var anchor = this._url.match(/\#(.*)/);
		anchor = anchor ? anchor[1] : null;
		this._anchor = anchor;

		if(anchor != null) {
			this._anchor = this.getNameValuePair(anchor);
			this._url = this._url.replace(/\#.*/, '');
		}

		return this;
	},
	/**
	 * 解析参数信息
	 * @method parseParam
	 * @return this
	 */
	parseParam:function() {
		var query = this._url.match(/\?([^\?]*)/);
		query = query ? query[1] : null;
		if(query != null) {
			this._url = this._url.replace(/\?([^\?]*)/, '');
			this._query = this.getNameValuePair(query);
		}

		return this;
	},
	/**
	 * 设置键值对
	 * @method getNameValuePair
	 * @param {Object} value
	 * @return {Object}
	 */
	getNameValuePair:function(value) {
		var result = {};
		value.replace(/([^&=]*)(?:\=([^&]*))?/gim, function(w, name, value) {
			if(name == "")
				return;

			result[name] = value || "";
		});

		return result;
	},
	/**
	 * 获取源链接
	 * @method getSource
	 * @return {String}
	 */
	getSource:function() {
		return this._source;
	},
	/**
	 * 获取参数值
	 * @method getParam
	 * @param {Object} name
	 * @return {String}
	 */
	getParam:function(name) {
		return this._query[name] || "";
	},
	/**
	 * 设置参数值
	 * @param {Object} name
	 * @param {Object} value
	 * @method setParam
	 * @return this
	 */
	setParam:function(name, value) {
		if(name == null || name == "" || typeof name != 'string')
			throw new Error("URL.setParam invalidate param.");

		this._query = this._query || {};
		this._query[name] = value;

		return this;
	},
	/**
	 * 清除所有参数
	 * @mthod clearParam
	 * @return this
	 */
	clearParam:function() {
		this._query = {};

		return this;
	},
	/**
	 * 设置Query
	 * @param {Object} value
	 * @return this
	 */
	setQuery:function(value) {
		if(typeof value == 'string') {
			this.parse();
			this._source = this._url = this._url + "?"+ value;
			this.parse();
			return this;
		}

		this._query = value;

		return this;
	},
	/**
	 * 获取Query
	 * @method getQuery
	 * @return {String}
	 */
	getQuery:function() {
		return this._query;
	},
	/**
	 * 获取锚点信息
	 * @method getAnchor
	 * @return {String}
	 */
	getAnchor:function() {
		return this.serialize(this._anchor);
	},
	/**
	 * 序列化对象
	 * @param {Object} value
	 * @method serialize
	 * @return {String}
	 */
	serialize:function(value) {
		var result = [];
		for(var key in value) {
			if(value[key] == null || value[key] == "") {
				result.push(key + "");
			}else {
				result.push(key + "=" + value[key]);
			}
		}

		return result.join("&");
	},
	/**
	 * 返回字符串格式
	 * @method toString
	 * @return {String}
	 */
	toString:function() {
		var query = this.serialize(this.getQuery());
		return this._url + (query.length>0?"?"+query:"") + (this._anchor?"#"+this.serialize(this._anchor):"");
	}
};

module.exports = URL;
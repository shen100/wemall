import React, { Component } from 'react';
import echarts              from 'echarts';

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.onResize    = this.onResize.bind(this);
		this.updateChart = this.updateChart.bind(this);
		this.state = {
			windowWidth: 1
		};
	}
    componentDidMount() {
    	this.setState({
			windowWidth: window.innerWidth
		});
		window.addEventListener('resize', this.onResize);
    }
    componentWillUnmount() {
    	window.removeEventListener('resize', this.onResize);	
    }
    onResize() {
    	if (this.state.windowWidth != window.innerWidth) {
    		this.setState({
				windowWidth: window.innerWidth
			});
    	}
    }
    componentWillReceiveProps(nextProps) {
    	if (this.props.collapsed != nextProps.collapsed) {
    		var self = this;
    		//Sidebar展开或收缩时有动画，图表容器的宽度在不断得变化，
    		//这里做兼容处理，动画结束后，刷新图表
	    	setTimeout(function() {
	    		self.updateChart();
	    	}, 400);
    	}
    }
    componentDidUpdate(prevProps, prevState) {
    	try {
    		let prevPropsStr = JSON.stringify(prevProps);
    		let propsStr     = JSON.stringify(this.props);
			if (prevPropsStr != propsStr || prevState.windowWidth != this.state.windowWidth) {
				this.updateChart();
			}
    	} catch(err) {

    	}
    }
    updateChart() {
		if (this.state.windowWidth <= 1) {
			return;
		}
		if (!this.props.data || this.props.data.length <= 0) {
			return;
		}
    	var myChart = echarts.init(this.refs.chart);
		myChart.setOption(this.getChartOption());
    }
    getChartOption() {
    	let data   = this.props.data;
    	let xName  = this.props.xName;
    	let yName  = this.props.yName;
    	let yLabel = this.props.yLabel;
    	let title  = this.props.title;
    	let xArr   = [];
    	let yArr   = [];
    	for (let i = 0; i < data.length; i++) {
    		xArr.push(data[i][xName]);
    		yArr.push(data[i][yName]);
    	}
    	return {
		    title: {
		        text: title,
		        left: 'center'
		    },
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		        	lineStyle: {
		        		type: 'dashed',
		        		color: '#ddd'
		        	}
		        },
		        formatter: '{b}<br/>' + yLabel + ': {c}'
		    },
		    xAxis: {
		        type: 'category',
		        splitLine: {show: false},
		        data: xArr,
		        axisLine: {
		        	lineStyle: {
		        		color: '#ccc',
		        		width: 1
		        	}
		        }
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        top: '40px',
		        bottom: '3%',
		        containLabel: true
		    },
		    yAxis: {
		        type: 'log',
		        splitLine: {
		        	lineStyle: {
		        		type: 'dashed',
		        		color: '#ddd'
		        	}
		        },
		        axisLine: {
		        	lineStyle: {
		        		color: '#ccc',
		        		width: 1
		        	}
		        }
		    },
		    series: [
		        {
		            type: 'line',
		            data: yArr,
		            itemStyle: {
		            	normal: {
		            		color: '#00c184',
		            		lineStyle: {
				        		color: '#00c184',
				        		width: 2
				        	}	
		            	}
		            }
		        }
		    ]
		};
    }
    render() {
        return (
			<div className="linechart" ref="chart"></div>
        )
    }
}
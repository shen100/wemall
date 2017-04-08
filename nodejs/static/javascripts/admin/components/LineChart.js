import React, { Component } from 'react';
import echarts              from 'echarts';

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			windowWidth: window.innerWidth
		};
		this.onResize    = this.onResize.bind(this);
		this.updateChart = this.updateChart.bind(this);
	}
    componentDidMount() {
    	this.updateChart();
		window.addEventListener('resize', this.onResize);
    }
    componentWillUnmount() {
    	window.removeEventListener('resize', this.onResize);	
    }
    componentDidUpdate(prevProps, prevState) {
    	this.updateChart();
    }
    onResize() {
    	if (this.state.windowWidth != window.innerWidth) {
    		this.setState({
				windowWidth: window.innerWidth
			});
    	}
    }
    updateChart() {
    	var myChart = echarts.init(this.refs.chart);
		myChart.setOption(this.getChartOption());
    }
    getChartOption() {
    	let data  = this.props.data;
    	let xName = this.props.xName;
    	let yName = this.props.yName;
    	let title = this.props.title;
    	let xArr  = [];
    	let yArr  = [];
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
		        formatter: '{b}<br/>' + title + ': {c}'
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
    	var style = {
    		width  : '100%',
    		height : '100%'
        };
        return (
            <div style={style} ref="chart"></div>
        )
    }
}
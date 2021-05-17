import axios from 'axios'
import React, { Component } from 'react'
import { connect } from "react-redux"
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Pagination from '@material-ui/lab/Pagination';
import './../styles/style.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Loader from './Loader';




export class NewsList extends Component {

    constructor(props) {
        super(props)

        this.dateSort = 1;
    }

    componentDidMount() {
        this.props.getNewData()
    }


    handleSearch = (e) => {
        this.props.search(e.target.value)
    }

    handlePageChange = (event, value) => {
        this.props.changePage(value)
    }
    sortDate = (e) => {
        this.props.sort(this.dateSort);
        this.dateSort = this.dateSort == 1 ? 2 : 1;
    }

    render() {
        const { rows } = this.props
        const pages = this.props.news.length / 10
        console.log(this.props);
        return (
            <div className="mainContainer">
                <div>
                    <h2>viAct Coding Test (Frontend Developer)</h2>
                    <TextField label="Search" className="search" type="text" onChange={this.handleSearch} />
                    <Paper className="container">
                        <Table>
                            <TableHead>
                                <TableRow>
                                <TableCell className="smallCl" ><b>Sr.</b></TableCell>
                                    
                                    <TableCell className="smallCl"><b>Image</b></TableCell>
                                    <TableCell className="smallCl"><b>Source</b></TableCell>
                                    <TableCell ><b>Author</b></TableCell>
                                    <TableCell ><b>Title</b></TableCell>
                                    <TableCell onClick={this.sortDate} className="smallCl"><b>Date</b></TableCell>
                                    <TableCell className="smallCl" ><b>Url</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((e,index) => (
                                    <TableRow key={e.id}>
                                        <TableCell className="smallCl">{((this.props.page)*10)+index+1}</TableCell>
                                        <TableCell className="smallCl"><img src={e.urlToImage} height="50px"></img></TableCell>
                                        <TableCell className="smallCl">{e.source.name}</TableCell>
                                        <TableCell >{e.author}</TableCell>
                                        <TableCell >{e.title}</TableCell>
                                        <TableCell className="smallCl">{e.date.toLocaleDateString("en-US")}</TableCell>
                                        <TableCell className="smallCl"><a href={e.url} target="_blank"> <Button variant="contained" color="primary">
                                            Link</Button></a></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                    <Pagination count={pages} color="primary" onChange={this.handlePageChange} />
                    
                </div>{this.props.loding}
                {this.props.loded == 0 && <Loader />}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        news: state.news,
        rows: state.rows,
        page: state.page,
        loded:state.loded
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getNewData: () => {
            axios.get('https://newsapi.org/v2/everything?q=a&pageSize=100&apiKey=8ac39d9d0804444c9da337a2e8a00055')
                .then(response => {
                    console.log(response)
                    dispatch({ type: "NEW_DATA", data: response.data.articles })

                })
                .catch(err => {

                })
        },
        changePage: (page) => {
            dispatch({ type: "CHANGE_PAGE", page: page })
        }
        ,
        search: (text) => {
            dispatch({ type: "SEARCH", text: text })
        },
        sort: (type) => {
            dispatch({ type: "SORT", sort: type })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsList)

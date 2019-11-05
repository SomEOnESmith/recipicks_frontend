import React, { Component } from "react";
import Modal from "react-responsive-modal";
import filterIcon from '../../assets/filter.png'
import SelectSearch from 'react-select-search'
import "../../assets/css/filterSearchCss.css";

const options = [
    { name: 'Swedish', value: 'sv' },
    { name: 'English', value: 'en' },

];

class FilterView extends Component {

    state = {
        open: false
    };

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };


    toggleModal = () => {
        this.setState({
            open: !this.state.open
        });
    }

    handleChange = () => {

    }

    render() {
        const { open } = this.state;
        return (
            <div >
                <button onClick={this.toggleModal} style={{ backgroundColor: "transparent", borderColor: "transparent" }}>

                    <img src={filterIcon} style={{ backgroundColor: "transparent", height: "30px", width: "27px" }}>

                    </img>

                </button>



                <Modal open={open} onClose={this.onCloseModal} styles={{ modal: {}, overlay: { background: "transparent" } }}  >

                    <div style={{ width: "550px", paddingTop: "20px", backgroundColor: "black" }}
                    >
                        <h3 style={{ color: "gray", paddingLeft: "160px" }} >
                            Filter Options
          </h3>









                        <hr />


                        <h5 style={{ color: "white", paddingLeft: "25px", paddingBottom: "15px" }} >
                            Meal
          </h5>





                        <h5 style={{ color: "white", paddingLeft: "25px", paddingBottom: "15px" }} >
                            Course
          </h5>

                        <div className="row" style={{ paddingLeft: "40px" }} >
                            <h5 style={{ color: "white", paddingBottom: "15px" }} >
                                Cuisine
                    </h5>
                            <SelectSearch options={options} style={{ BackgroundColor: "red" }} value="sv" name="language" placeholder="Choose your language" />



                        </div>
                    </div>


                </Modal>
            </div>
        );
    }
}

export default FilterView;
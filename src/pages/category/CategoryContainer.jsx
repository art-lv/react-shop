import Category from "./Category"
import { getCategory, sendIdOpenCategory, deleteIdOpenCategory } from "../../redux/category-reduser"
import { connect } from "react-redux"



const CategoryContainer = (props) => {
    return (
        <div>
            <Category 
            getCategory={props.getCategory}
            categoryData={props.categoryData}
            idOpenCategory={props.idOpenCategory}
            sendIdOpenCategory={props.sendIdOpenCategory}
            deleteIdOpenCategory={props.deleteIdOpenCategory}
            isFetching={props.isFetching} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    categoryData: state.category.categoryData,
    idOpenCategory: state.category.idOpenCategory,
    isFetching: state.category.isFetching
})

export default connect(mapStateToProps, { getCategory, sendIdOpenCategory, deleteIdOpenCategory })(CategoryContainer)
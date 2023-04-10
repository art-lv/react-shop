import Catalog from "./Catalog"
import { getCatalog, getAllSorting, setSort, setCurrentPage, getCatalogSorting, setCatalogSlug, getSearchCatalog, getFiltersCatalog, setCatalogFilter, sendCheckInput, sendPrice/* comebackCatalog, setComeback */ } from "../../redux/catalog-reducer"
import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

const CatalogContainer = (props) => {


    let { slug } = useParams()




    useEffect(() => {
        // Первое получение товаров
        props.getCatalog(slug, props.sort, props.currentPage, props.filter)

        // Запишем slug категории
        props.setCatalogSlug(slug)

        // Первое получение всех сортировок
        props.getAllSorting()
    }, [])

    /* https://test11.itepro.ru/gateway/frontend/product?page=1
    https://test11.itepro.ru/gateway/frontend/gadgets?page=1

    https://test11.itepro.ru/gateway/frontend/category/gadgets?page=1 */

    return (
        <div>
            <Catalog 
            getCatalog={props.getCatalog}
            catalogData={props.catalogData}
            getAllSorting={props.getAllSorting}
            allSorting={props.allSorting}
            setSort={props.setSort}
            sort={props.sort}
            currentPage={props.currentPage}
            setCurrentPage={props.setCurrentPage}
            getCatalogSorting={props.getCatalogSorting}
            /* comebackCatalog={props.comebackCatalog} */
            isFetching={props.isFetching}
            slug={props.slug}
            catalogInfo={props.catalogInfo}
            getSearchCatalog={props.getSearchCatalog}
            filters={props.filters}
            getFiltersCatalog={props.getFiltersCatalog}
            setCatalogFilter={props.setCatalogFilter}
            filter={props.filter}
            sendCheckInput={props.sendCheckInput}
            sendPrice={props.sendPrice}
            /* setComeback={props.setComeback} */
            /* isComeback={props.isComeback} */ />
        </div>
    )
}

const mapStateToProps = (state) => ({
    catalogData: state.catalog.catalogData,
    allSorting: state.catalog.allSorting,
    currentPage: state.catalog.currentPage,
    sort: state.catalog.sort,
    isFetching: state.catalog.isFetching,
    slug: state.catalog.slug,
    catalogInfo: state.catalog.catalogInfo,
    filters: state.catalog.filters,
    filter: state.catalog.filter
    /* isComeback: state.catalog.isComeback */
})

export default connect(mapStateToProps, { getCatalog, getAllSorting, setCurrentPage, getCatalogSorting, setSort, setCatalogSlug, getSearchCatalog, getFiltersCatalog, setCatalogFilter, sendCheckInput, sendPrice /* comebackCatalog, setComeback */ })(CatalogContainer)


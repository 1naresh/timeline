

export const changeBreadcrumb = (breadcrumb) =>{
    return {
        type : "BREADCRUMG_CHANGE",
        breadcrumb
    }
}
export const editProduct = (_id) =>{
    return {
        type : "EDIT_PRODUCT",
        _id
    }
}
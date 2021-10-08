class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            s_item_name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
            
        } : {}

        console.log(keyword);
        
        this.query = this.query.find({ ...keyword });
        return this;
    }

    search2() {
        const keyword = this.queryStr.keyword ? {
            supplier_name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
            
        } : {}

        console.log(keyword);
        
        this.query = this.query.find({ ...keyword });
        return this;
    }

    search3() {
        const keyword = this.queryStr.keyword ? {
            supplier_id: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
            
        } : {}

        console.log(keyword);
        
        this.query = this.query.find({ ...keyword });
        return this;
    }


    filter() {
        const queryCopy = { ...this.queryStr};

        //Removing necessary fields from query
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el]);
        
        //console.log(queryCopy); //used for checking

        let queryStr =JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        
        // console.log(queryStr); //used for suppliedError chockingj

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1; //current page or the first page
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures
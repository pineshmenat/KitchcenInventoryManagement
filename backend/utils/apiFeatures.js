class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //FILTERING
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(field => delete queryObj[field]);

    //Advanced FILTERING
    let queryStr = JSON.stringify(queryObj);
    //Regex to match exactly individual op and not something like ABCDlteEF to prevent this we use \b
    //e.g. price[lte]=5 => { price: { lte: '5' } } => { price: { '$lte': '5' } }
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    //Querying
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    // //Sorting ?sort=price,quantity => "price quantity"
    if (this.queryString.sort)
      this.query = this.query.sort(this.queryString.sort.split(',').join(' '));
    else this.query = this.query.sort('bestBefore');

    return this;
  }

  paginate() {
    //Limiting
    const limit = this.queryString.limit ? this.queryString.limit * 1 : 100;
    const page = this.queryString.page
      ? parseInt(this.queryString.page, 10)
      : 1;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  limitFields() {
    //Projecting/ Field limiting fields=name,price,quantity => "name price quantity"
    if (this.queryString.fields)
      this.query = this.query.select(
        this.queryString.fields.split(',').join(' ')
      );
    else this.query = this.query.select('-__v');

    return this;
  }
}

module.exports = APIFeatures;

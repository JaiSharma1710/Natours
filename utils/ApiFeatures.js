class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const filterQuery = { ...this.queryString };
    const excludedParams = ['page', 'sort', 'limit', 'fields'];
    excludedParams.forEach((e) => delete filterQuery[e]);

    this.query = this.query.find(filterQuery);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      this.query = this.query.sort(this.queryString.sort);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitingFeilds() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      //-ve is used to exclude the key
      this.query = this.query.select('-__v _id');
    }

    return this;
  }

  pagination() {
    if (this.queryString.page || this.queryString.limit) {
      const page = +this.queryString.page || 1;
      const limit = +this.queryString.limit || 10;
      const skipValue = (page - 1) * limit;

      this.query = this.query.skip(skipValue).limit(limit);
    }
    return this;
  }
}

module.exports = ApiFeatures;

class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  paginate() {
    let page = this.queryString.page * 1 || 1;
    if (this.queryString.page <= 0) {
      page = 1;
    }
    let skip = (page - 1) * 5;
    this.mongooseQuery.skip(skip).limit(5);
    return this;
  }

  filter() {
    let filterObject = { ...this.queryString };
    let excludeedQuery = ["page", "sort", "fields", "keyword"];
    excludeedQuery.forEach((e) => {
      delete filterObject[e];
    });

    filterObject = JSON.stringify(filterObject);
    filterObject = filterObject.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    filterObject = JSON.parse(filterObject);
    this.mongooseQuery.find(filterObject);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      let sortedBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery.sort(sortedBy);
    }
    return this;
  }

  search() {
    if (this.queryString.keyword) {
      this.mongooseQuery.find({
        $or: [
          { title: { $regex: this.queryString.keyword, $options: "i" } },
          { description: { $regex: this.queryString.keyword, $options: "i" } },
        ],
      });
    }
    return this;
  }

  fields() {
    if (this.queryString.fields) {
      let fields = this.queryString.fields.split(" ").join(" ");
      this.mongooseQuery.select(fields);
    }
    return this;
  }
}

export default ApiFeatures;

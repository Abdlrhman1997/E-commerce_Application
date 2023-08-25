class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  paginate() {
    let pageLimit = 5;
    let pageNumber = this.queryString.page * 1 || 1;
    if (pageNumber <= 0) {
      pageNumber = 1;
    }
    const skip = (pageLimit - 1) * pageNumber;
    this.page = pageNumber;
    this.mongooseQuery.skip(skip).limit(pageLimit);
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
    this.mongooseQuery.filter(filterObject);
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

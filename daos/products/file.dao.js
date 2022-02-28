import FilesContainer from "../../containers/FilesContainer";

module.exports = class ProductDAO extends FilesContainer {
  constructor() {
    super([], "productos", "productos");
  }
}
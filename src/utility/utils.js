export class publicUtils {
  static addItemToDropdown(selectedOptions, setSelectedOptions, Item) {
    const copySelectedOptions = [...selectedOptions];
    const idx = copySelectedOptions.indexOf(Item);
    const updatedSelectedOptions = copySelectedOptions.splice(idx, 1);
    setSelectedOptions([...copySelectedOptions, updatedSelectedOptions]);
  }
}

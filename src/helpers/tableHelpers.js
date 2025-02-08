// Format values with default fallback
export const formatOrDefault = (value, formatter) => {
    if (value == null) return '-';
    return formatter ? formatter(value) : value;
};

// Get sticky header styles
export const getStickyHeaderStyles = () => ({
    backgroundColor: "#fff",
    color: "#000",
    position: "sticky",
    top: 0,
    zIndex: 11
});

// Get sticky column styles
export const getStickyColumnStyles = (columnKey, index, stickyColumns, isHeader = false) => {
    if (!stickyColumns.includes(columnKey)) return {};
    return {
        backgroundColor: "#fff",
        color: "#000",
        position: "sticky",
        left: `${index * 50}px`,
        zIndex: isHeader ? 12 : 10
    };
};

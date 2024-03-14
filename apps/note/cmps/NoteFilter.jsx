// const { useState, useEffect } = React;

// export function NoteFilter({ onSetFilter, filterBy }) {
//   const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

//   useEffect(() => {
//     onSetFilter(filterByToEdit);
//   }, [filterByToEdit]);

//   function onFilter(ev) {
//     ev.preventDefault();
//     onSetFilter(filterByToEdit);
//   }

//   function handleChange({ target }) {
//     let { value, name: field, type } = target;
//     console.log(value, field, type);
//     setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }));
//     console.log(filterByToEdit);
//   }

//   return (
//     <section className="note-filter">
   
      
//     </section>
//   );
// }

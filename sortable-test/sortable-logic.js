// Custom JS for implementing sortability to a list from this years internship

var draggedElement, isDragging, subListItems;

// Event for clicking down on the mouse
document.addEventListener("mousedown", function (event){
	if (event.target.className === 'handler'){
		console.log('works');
		isDragging = true
		// Store the elements parent which is the li element to the draggedElement
		draggedElement = event.target.parentNode;
		// gives coordinates of mouse event
		let baseX = event.clientX
		let baseY = event.clientY
		
		let draggedElementX = draggedElement.getBoundingClientRect().left;
		let draggedElementY = draggedElement.getBoundingClientRect().right;
		
		// THis is actually necessary, really difficult to move stuff wihtout it
		if (typeof placeholder !== 'undefined'){
			//hide dragged element
			draggedElement.style  = 'display: none;';
			placeholder.style = `display:block;position:absolute;left:${event.clientX}px;top:${event.clientY}px; z-index: 999;`;
		}
		
		draggedElement.classList.remove('sortable');
		
		// add placeholder list item to every list
		const orderLists = [].slice.call(document.getElementsByClassName('sortable-list'));
		
		Array.prototype.forEach.call(orderLists, function (list){
			const emptyListItem = document.createElement('li');
			emptyListItem.classList.add('delete-me');
			emptyListItem.classList.add('sortable');
			const noContent = document.createTextNode('');
			emptyListItem.appendChild(noContent);
			list.append(emptyListItem)
		})
		
		// Check if element has other items that are sortable in it
		subListItems= [].slice.call(draggedElement.getElementsByClassName('sortable'));
		Array.prototype.forEach.call(subListItems, function(item){
			item.classList.remove('sortable');
		})
		
	}
}, false);

// Event for moving mouse around
document.addEventListener('mousemove', function (event) {
	if (isDragging) {
		//Move dragged element based on handler
		let deltaX = 0;
		let deltaY = 0;
		const allListItems = document.getElementsByClassName('sortable');
		i=0;
		let nextListItem = allListItems[i];
		Array.prototype.forEach.call(allListItems,function (item){
			item.classList.remove('sortable-next-sibling');
		});
		if (typeof placeholder !== 'undefined'){
			//hide dragged element
			draggedElement.style  = 'display: none;';
			placeholder.style = `display:block;position:absolute;left:${event.clientX}px;top:${event.clientY}px; z-index: 999;`;
		}
		for (i=0; i< allListItems.length; i+=1){
			nextListItem = allListItems[i];
			if (nextListItem.getBoundingClientRect().top > event.clientY){
				nextListItem.classList.add('sortable-next-sibling');
				nextListItem.parentNode.insertBefore(draggedElement, nextListItem);
				return;
			}
		}
	}
});

document.addEventListener('mouseup', function (event) {
	if (isDragging){
		draggedElement.style="position: relative";
		draggedElement.classList.add('sortable');
		draggedElement = null;
		isDragging = false;
		// Remove all prior helper styleSheets
		const allListItems = document.getElementsByClassName('sortable');
		Array.prototype.forEach.call(allListItems, function (item){
			item.classList.remove('sortable-next-sibling');
		});
		
		Array.prototype.forEach.call(subListItems, function (item){
			item.classList.add('sortable');
		});
		
		// Placeholders to put items within them
		const placeholders = [].slice.call(document.getElementsByClassName('delete-me'));
		Array.prototype.forEach.call(placeholders, function (item){
			item.parentNode.removeChild(item);
		})
		placeholder.style ='display:none;'
	}
},false);

// Event for clicking up on the mouse

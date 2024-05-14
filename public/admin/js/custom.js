
const handleDelete = (link) => {
  Swal.fire({
    title: "Bạn có chắc chắn muốn xóa không?",
    text: "Bạn sẽ không thể khôi phục dữ liệu đã xóa!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Vâng, xóa đi!",
  }).then((result) => {
    if (result.isConfirmed) {
      document.location.href = link;
    }
  });
};
const handleUpdateStatus = (id, status,type) => {
  
  $.ajax({
    type: "GET",
    url: `/admin/${type}/changeStatus/${id}/${status}`,
    dataType: "json",
    success: function (response) {
      const newStatus = response.status;
      const newStatusClass = newStatus === 'active' ? 'badge-success' : 'badge-danger';

     
      $(`#status-${id}`).html(`
        <a href="/changeStatus/${id}/${newStatus}">
          <span class="badge ${newStatusClass}">${newStatus}</span>
        </a>
      `);
    },
    error: function (error) {
      console.error('Error updating status:', error);
      
      $(`#status-${id}`).html(`<span class="badge badge-danger">Error updating status</span>`);
    }
  });
};

jQuery(document).ready(function($)  {
  var element=document.getElementById('textside');
  var text=element.innerText;
  $('#selectAllCheckbox').change(() => {  
    $('input[name="selectedItems"]').prop('checked', $('#selectAllCheckbox').prop('checked'));
  });

  $('input[name="selectedItems"]').change(() => {
    const allCheckboxesChecked = !$('input[name="selectedItems"]:not(:checked)').length;
    $('#selectAllCheckbox').prop('checked', allCheckboxesChecked);
  });

  $('.dropdown-menu a').click(function() {
    const action = $(this).data('action');
    
    const selectedCheckboxes = $('input[name="selectedItems"]:checked');

    if (selectedCheckboxes.length > 0) {
      const selectedItems = selectedCheckboxes.map(function() {
        return $(this).val();
      }).get();

      console.log("Action: " + action);
      console.log("Selected Items: " + selectedItems.join(', '));

      $.ajax({
        type: "post",
        url: `/admin/${text}/changeStatusTool`,
        contentType: "application/json", 
        data: JSON.stringify({
            action: action,
            selectedItems: selectedItems
        }),
        success: function(response) {
            console.log(response);
        },
        error: function(error) {
            console.error(error);
        }
    });    
    } else {
      console.log("No checkboxes selected.");
    }
  });
});




const fetchDataWithSorting = async (status, keyword, sort) => {
  let query = {};
  let sortOption = {};

  if (status === 'all') {
    query = {};
  } else if (status) {
    query.status = status;
  }

  if (keyword) {
    query.$or = [
      { name: new RegExp(keyword, 'i') },
      { description: new RegExp(keyword, 'i') },
    ];
  }

  if (sort === 'orderingDesc') {
    sortOption = { ordering: -1 };
  }

  return await newsModel.find(query).sort(sortOption);
};
const previewImage = (input) => {
  const preview = document.getElementById('avatarPreview');
  const file = input.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      preview.src = e.target.result;
    };

    reader.readAsDataURL(file);
  } else {
    preview.src = '';
  }
};
// document.addEventListener('DOMContentLoaded', function () {
//   const ckeditorForm = async () => {
//       ClassicEditor
//           .create(document.querySelector('#editor'))
//           .catch(error => {
//               console.error(error);
//           });
//   };
//   ckeditorForm();
// });
document.addEventListener('DOMContentLoaded', function () {
  let editor;

  ClassicEditor
      .create(document.querySelector('#editor'))
      .then(newEditor => {
          editor = newEditor;
      })
      .catch(error => {
          console.error(error);
      });

  document.querySelector('#submit').addEventListener('click', () => {
      const editorData = editor.getData();
      console.log('Editor content:', editorData);
  });
});
const highlightKeyword = (text, keyword) => {
  const escapedKeyword = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(escapedKeyword, 'gi');
  return text.replace(regex, '<span class="highlight">$&</span>');
};

function calculateExpiryDate() {
  var createDate = new Date("<%= item.createAt %>");
  var daysToAdd = parseInt(document.getElementById('expirateDays').value);
  var expiryDate = new Date(createDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
  var formattedExpiryDate = expiryDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  document.getElementById('calculatedExpiryDate').value = formattedExpiryDate;
}

document.getElementById('expirateDays').addEventListener('input', function() {
  calculateExpiryDate();
});

var previewNode = document.querySelector("#template");
previewNode.id = "";
var previewTemplate = previewNode.parentNode.innerHTML;
previewNode.parentNode.removeChild(previewNode);

FilePond.registerPlugin(
  FilePondPluginFileEncode,
	FilePondPluginFileValidateSize,
	FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview
);

// Select the file input and use create() to turn it into a pond
FilePond.create(
	document.querySelector('input')
);

const pond = FilePond.create(document.querySelector('.filepond'), {
  allowMultiple: true, 
  maxFiles: 3,
  labelIdle: 'Drag & Drop your files or <span class="filepond--label-action">Browse</span>',
  server: {
      url: '/admin/news/dropzone/<%= item._id%>',
      process: {
          method: 'POST'
      }
  },
  onaddfile: (error, file) => {
    console.log('onaddfile called')
    if (error) {
        console.error('An error occurred while adding the file:', error);
        return;
    }
    renderSelectedImages();
}
});

pond.on('addfile', () => {
  renderSelectedImages();
});

function renderSelectedImages() {
  console.log('render called');
  const container = document.getElementById('selected-images-container');
  container.innerHTML = '';

  const files = pond.getFiles();
  if (files.length > 0) {
      files.forEach(file => {
          const img = document.createElement('img');
          img.src = URL.createObjectURL(file.file);
          img.classList.add('selected-images');
          container.appendChild(img);
      });
  }
}


const form = document.getElementById('upload-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
      await pond.processFiles(); 
  } catch (error) {
      console.error('Error uploading files:', error);
  }
});
 

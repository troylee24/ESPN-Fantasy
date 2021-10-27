var records, columns, cols, grades;

function initVars(records, columns, cols, grades) {
    records = records;
    columns = columns;
    cols = cols;
    grades = grades
}

$(document).ready(function() {
    var statsTable = $("#statsTable").DataTable({
        "data": records,
        "columns": columns,
        "scrollX": true,
        // "autoWidth": false,
        "pageLength": 25,
        "lengthMenu": [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"]
        ],
        "order": [[5, "asc"]],
        "columnDefs": [
            {
                "targets": [0, 1, 2, 3, 4],
                "visible": false,
            },
            {
                "targets": [0, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
                "searchable": false,
            },
            {
                "orderSequence": ["desc", "asc"], "targets": [8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
            },
            {
                "width": "35px", "targets": [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
            },
            {
                "width": "186px", "targets": [5]
            },
            {
                "targets": "_all",
                "createdCell": function (td, cellData, rowData, row, col) {
                    var key = cols[col]
                    var color = grades[row][key]
                    $(td).css('background-color', color)
                }
            }
        ],
        initComplete: function () {
            var hiddenColumns = {
                1: "Fantasy Team",
                2: "Season Year",
                3: "Season View",
                4: "Stats View",
            }
            this.api().columns(Object.keys(hiddenColumns)).every( function () {
                var column = this;
                var div = $('<div></div>')
                var span = $('<span>'+hiddenColumns[column.index()]+'</span>').appendTo(div)
                var select = $('<select class="selectpicker"><option value=""></option></select>')
                    .appendTo( $(div) )
                    .on( 'change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );

                        column
                            .search( val ? '^'+val+'$' : '', true, false )
                            .draw();
                    } );
                div.appendTo('#filterContainer')
                column.data().unique().sort().each( function ( d, j ) {
                    select.append( '<option value="'+d+'">'+d+'</option>' )
                } );
            } );
        }
    })

    $('.form-check-input').change(function (e) {
        e.preventDefault();
        var column = statsTable.column( $(this).attr('column') );
        column.visible( ! column.visible() );
    } );
});
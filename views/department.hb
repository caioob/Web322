    <head>
        <link href="../site.css" rel="stylesheet">
    </head>

<div class="row">
    <div class="col-md-12">
        {{#each data}}
        <h2>{{ this.departmentName}} - Department: {{ this.employeeNum}}</h2>
        <hr />

        <form method="post" action="/departments/update">

            <input type="hidden" name="departmentId" value="{{ this.departmentId}}" />
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="departmentName">Department Name</label>
                            <input class="form-control" id="departmentName" name="departmentName" type="text" value="IT" />
                        </div>
                    </div>
                </div>
            <hr />
            <input type="submit" class="btn btn-primary pull-right" value="Update Department" /><br /><br /><br />
        </form>
    {{/each}}
    </div>
</div>
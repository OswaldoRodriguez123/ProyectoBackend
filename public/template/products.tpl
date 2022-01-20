
<div class="table-responsive" style="margin-top:10px">
    <table class="table table-striped table-bordered">
        <thead>
            <tr>
                <th class="col">#</th>
                <th class="col">Título</th>
                <th class="col">Precio</th>
                <th class="col">Imagen</th>
            </tr>
        </thead>
        <tbody>
            {{#each products}}
                <tr>
                    <th scope="row">{{this.id}}</th>
                    <td>{{this.title}}</td>
                    <td>{{this.price}}</td>
                    <td><img style="width: 10rem" src={{this.thumbnail}} alt={{this.title}}></td>
                </tr>
            {{/each}}
        </tbody>
    </table>
</div>
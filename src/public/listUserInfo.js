addEventListener('DOMContentLoaded', async () => {

    try {
        const userId = window.location.pathname.split('/').pop();

        const response = await fetch(`/api/users`);
        const userData = await response.text();
        const user = JSON.parse(userData);
        console.log(userData);
        console.log(user);


        const table = document.getElementById('users-info');
        const tr = document.createElement('tr');
        const tdId = document.createElement('td')
        const tdName = document.createElement('td');
        const tdEmail = document.createElement('td');
        const tdCreatedAt = document.createElement('td');

        tdId.innerText = user.id;
        tdName.innerText = user.username;
        tdEmail.innerText = user.email;
        tdCreatedAt.innerText = user.createdAt;

        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdEmail);
        tr.appendChild(tdCreatedAt);

        table.appendChild(tr)

    } catch (e) {
        console.error('Error fetching user details:', error);
    }


});
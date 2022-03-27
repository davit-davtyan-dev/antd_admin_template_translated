import React from "react";
import TypingCard from "@/components/TypingCard";
export default () => {
  const cardContent = `
    Menu permissions and routing permissions in this project are allocated based on the role belonging to the user, and three roles are built in this project, respectively:

    <ul>
      <li>Administrator admin: This role has permissions to all menus and routes in the system.</li>
      <li>Editor's Editor: This role has the permissions of all menus and routing outside the system to remove the user management page.</li>
      <li>Visitors Guest: This role has only Dashboard, author blog, permission test, and authority about the author's three pages.</li>
    </ul>

    You can pass<a href="#/user">User Management</a>Pages, dynamically add or delete users, and edit an existing user, such as modifying its permissions.
  `;
  return (
    <div className="app-container">
      <TypingCard title="Permission description" source={cardContent} />
    </div>
  );
};

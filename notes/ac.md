### Application details: At a high level your application will fetch a list of StackOverflow users and display the list on the screen.

- It must compile without errors -  if there are any potential compilation issues highlight them in your documentation.
- When the app is launched, the user should be able to see a list of the top 20 StackOverflow users.
- Each list item should contain user's **profile image, name and reputation**
- If the server is unavailable (e.g. offline), the user should see a list of empty states with an error message.
- Have cells be expandable (upon tapping the cell), with additional options to 'follow' and 'block' a user
- Follow/block functionality should just be locally simulated, i.e. no actual API call should be made. The meaning of following and blocking is explained in the points below
- Users that are followed should show an indicator in the main part of the list item
- Users that are blocked should show in a disabled greyed-out list item; tapping on the item should not open the details view
- Include the 'unfollow' option in the view when a user is followed
- Write unit tests wherever you see fit
- Emphasize testing and architecture
- Typescript

- It should be designed such that the code can bridge to Native
- Explain in a few sentences the design decisions you took developing the above app, and describe anything that you were unable to do due to the time constraint
 

# Key Requirements: Your solution must meet the following requirements:

- A readme.md in the root of the project with clear instructions on installing and running the application.
- Use react 17 >
- Provide some baseline unit tests
- Any additional documentation where you believe is required for the application.
- If your project is web based, please ensure that it is responsive
- Please indicate roughly how much time you spent on this challenge in the following categories: (this doesn’t have to be accurate, rough estimations are fine) 
  - Review
  - Design
  - Implementation
  - Testing
  - Documentation

## Optional Bonus Points
- Generated JSDocument using your favorite documentation tool.
- Add filtering / search input that filters the list of results from the API call.
- Implement a caching strategy.
- Add paging


## Other Information:

The API call for your user data is:

- GET: http://api.stackexchange.com/2.2/users?pagesize=20&order=desc&sort=reputation&site=stackoverflow
- You are free to use any UX libraries you are most comfortable with as this will afford you the opportunity to best display your styling-fu.
- You are free to use any storage mechanism you are familiar with.

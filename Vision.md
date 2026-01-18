# CleanNow Vision 🦄

## Core Concept
A smart, mood-driven chore assistant PWA that feels magical.
**The main decision factor is: MY MOOD.**

The system balances:
1. User's Mood (Energy Level)
2. Chore Priority
3. Impact of Delays (Frequency)

## Key Workflows

1. **Check-in**: Ask "How are you feeling?" (1-5 Energy Scale).
2. **Suggest**: Recommend the top 3 chores based on mood and urgency.
3. **Smart Timing**: Avoid repeating the same chore too often; suggest "Focus Mode" for delayed tasks.
4. **Day Progress**: Visualize the day (Default: 8am - 11pm) with "chore dots" indicating optimal times.
5. **Breaks**: Suggest relaxation activities (hobbies) between heavy chores.

## Chore Catalog
*(Default list for 2-bedroom apartment)*

| Chore | Frequency | Priority | Energy |
|-------|-----------|----------|--------|
| 🍽️ Doing the Dishes | Daily | High (3) | Low (2) |
| 🗑️ Take Out Garbage | Every 2 Days | High (3) | Low (1) |
| 🧺 Doing the Laundry | Every 3 Days | Med (2) | Med (3) |
| 👕 Folding Laundry | Every 3 Days | Med (2) | Low (1) |
| 💻 Workstation Mgmt | Every 3 Days | Low (1) | Low (2) |
| 🧹 Floor Broom/Mop | Every 5 Days | Med (2) | High (4) |
| 🛏️ Changing Sheets | Weekly | Med (2) | Med (3) |
| 🚿 Clean Bathroom | Weekly | Med (2) | High (4) |
| 📦 Organize Room | Weekly | Low (1) | Med (3) |
| 📊 Check Bills | Weekly | Low (1) | Low (1) |

## Hobbies (Break Suggestions)
- 📚 Reading a book
- 🎨 Painting
- 📺 Watching a show
- 💃 Practice dance
- 🏺 Play with clay
- 🧖 Self-care
- 📞 Talk to a friend

## Technical Requirements
- **Stack**: Vanilla HTML5, CSS3, JavaScript (No frameworks for speed/simplicity).
- **Architecture**: PWA (Progressive Web App).
- **Theme**: Unicorn Theme (Pink/Purple/Cyan) + multiple aesthetic options.
- **Performance**: Snappy, lightweight, works offline.
- **Deployment**: GitHub Pages compatible.

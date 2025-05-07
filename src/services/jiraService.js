const {VITE_JIRA_TICKET} = import.meta.env;

export const fetchJiraTicket = (id) => {
    return JSON.stringify(VITE_JIRA_TICKET);
}
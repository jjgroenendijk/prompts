# Project TODO List: Prompt Rule Selector
## AI Agent Implementation Guide

This TODO list is organized into independent, atomic tasks suitable for AI coding agents. Each task group can be executed by a separate agent in parallel.

---

## 🚀 TASK GROUP 10: Deployment Configuration

**Agent Role**: DevOps Agent  
**Dependencies**: TASK GROUP 1 (Project Init), TASK GROUP 3 (Config)  
**Estimated Complexity**: Medium  

### Tasks:

#### 10.2 Custom Domain Setup
- [ ] Create `public/CNAME` file with domain: `jjgroenendijk.nl`
- [ ] Document DNS configuration needed (CNAME record)
- [ ] Update README with custom domain setup instructions

#### 11.1 Functional Verification
- [ ] Test snippet loading displays all snippets
- [ ] Test search filters snippets correctly
- [ ] Test category checkboxes filter snippets
- [ ] Test snippet selection/deselection
- [ ] Test "Select All" in category
- [ ] Test "Clear All" button
- [ ] Test output concatenation with separator
- [ ] Test copy to clipboard functionality
- [ ] Test Edit button opens correct GitHub URL
- [ ] Test Add button opens GitHub new file page
- [ ] Test Settings button opens config.yml edit page

#### 11.2 Responsive Design Verification
- [ ] Test layout at 320px width (mobile)
- [ ] Test layout at 768px width (tablet)
- [ ] Test layout at 1024px+ width (desktop)
- [ ] Verify columns stack on mobile
- [ ] Verify touch interactions work on mobile

#### 11.3 Dark Mode Verification
- [ ] Test in light mode (all components)
- [ ] Test in dark mode (all components)
- [ ] Verify theme switches when system preference changes
- [ ] Check color contrast for accessibility

#### 11.4 Edge Cases
- [ ] Test with empty snippets directory
- [ ] Test with no search results
- [ ] Test with very long content (>1000 chars)
- [ ] Test with special characters in filenames
- [ ] Test with 50+ snippets (performance)

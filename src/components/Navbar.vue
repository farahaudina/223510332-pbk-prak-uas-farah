<template>
  <header class="custom-navbar">
    <div class="container">
      <div class="branding">
        <span class="logo">🌄Weather Widget Realtime</span>
      </div>
      <nav class="navigation">
        <div class="dropdown">
          <button @click="toggleDropdown" class="sidebar-toggle">☰ Pilih Tugas</button>
          <transition name="dropdown">
            <ul v-if="dropdownVisible" class="dropdown-menu">
              <li v-for="task in tasks" :key="task.id" class="dropdown-item">
                <a :href="task.link" target="_blank">{{ task.name }}</a>
              </li>
            </ul>
          </transition>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      dropdownVisible: false,
      tasks: [
        { id: 1, name: 'Tugas 1', link: 'https://farah-project-cv.vercel.app/' },
        { id: 2, name: 'Tugas 2', link: 'https://tugas-pertemuan-2.vercel.app/' },
        { id: 3, name: 'Tugas 3', link: 'https://www.youtube.com' },
        { id: 4, name: 'Tugas 4', link: 'https://www.youtube.com' },
        { id: 5, name: 'Tugas 5', link: 'https://www.youtube.com' },
        { id: 6, name: 'Tugas 6', link: 'https://www.youtube.com' },
      ],
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
  },
};
</script>

<style scoped>
.custom-navbar {
  background-color: #42a5f5;
  color: white;
  padding: 10px 0;
  z-index: 1100;
  position: fixed;
  width: 100%;
}

.logo {
 color: linear-gradient(60deg, #22b3ed, #cac9ce);;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 0 20px;
}

.branding .logo {
  font-size: 1.5rem;
  background: linear-gradient(60deg, #edc42287, #edecef60);
  padding: 10px;
  border-radius: 15px;
  color: rgb(29, 30, 29);
  

}

.navigation {
  display: flex;
  align-items: center;
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  color: #333;
  list-style: none;
  margin: 0;
  padding: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
  z-index: 1000;
  min-width: 200px;
}

.dropdown-item {
  padding: 0;
  margin: 0;
  list-style: none;
  padding: 10px;
  margin-right: 15px;
}

.dropdown-item a {
  display: block;
  padding: 10px 20px;
  color: #f6f1f1;
  text-decoration: none;
  background: linear-gradient(135deg, #6b73ff 0%, #000dff 100%);
  transition: all 0.3s ease;
  border-radius: 30px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.dropdown-item a:hover {
  background: linear-gradient(135deg, #000dff 0%, #6b73ff 100%);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

.sidebar-toggle {
  background: linear-gradient(135deg, #6b73ff 0%, #000dff 100%);
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 10px 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  margin-right: 15px;
}

.sidebar-toggle:hover {
  background: linear-gradient(135deg, #000dff 0%, #6b73ff 100%);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

.sidebar-toggle:active {
  background: linear-gradient(135deg, #000dff 0%, #6b73ff 100%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  transform: translateY(2px);
}

.sidebar-toggle:focus {
  outline: none;
}

.sidebar-toggle:focus-visible {
  outline: 2px solid white;
  background: linear-gradient(135deg, #000dff 0%, #6b73ff 100%);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* Dropdown animation */
.dropdown-enter-active, .dropdown-leave-active {
  transition: opacity 0.3s ease;
}

.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0;
}
</style>

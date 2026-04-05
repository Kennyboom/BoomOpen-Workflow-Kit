import os
import re

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return False
        
    old_content = content
    
    # 1. 'boomopen workflow kit' -> 'BoomOpen Workflow Kit'
    content = re.sub(r'boomopen workflow kit', 'BoomOpen Workflow Kit', content)
    # 2. 'boomopen workflow kit' -> 'boomopen workflow kit'
    content = re.sub(r'boomopen workflow kit', 'boomopen workflow kit', content)
    # 3. 'BoomopenWorkflowKit' -> 'boomopenWorkflowKit'
    content = re.sub(r'BoomopenWorkflowKit', 'boomopenWorkflowKit', content)
    # 4. 'BoomopenWorkflowKit' -> 'BoomopenWorkflowKit'
    content = re.sub(r'BoomopenWorkflowKit', 'BoomopenWorkflowKit', content)
    # 5. 'boomopen-workflow-kit' -> 'boomopen-workflow-kit' (in case I missed any)
    content = re.sub(r'boomopen-workflow-kit', 'boomopen-workflow-kit', content)
    
    if content != old_content:
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        except Exception:
            pass
    return False

def scan_dir(root_dir):
    modified = 0
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Exclude node_modules and .git
        if 'node_modules' in dirnames:
            dirnames.remove('node_modules')
        if '.git' in dirnames:
            dirnames.remove('.git')
        if '.next' in dirnames:
            dirnames.remove('.next')
            
        for file in filenames:
            ext = os.path.splitext(file)[1]
            if ext in ['.js', '.ts', '.tsx', '.md', '.json', '.txt', '.mdc', '.yml', '.yaml']:
                fp = os.path.join(dirpath, file)
                if process_file(fp):
                    modified += 1
                    print(f"Fixed: {fp}")
    print(f"Total files updated: {modified}")

scan_dir('.')

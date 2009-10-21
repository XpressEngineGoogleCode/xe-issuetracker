<?php

    class issueHistory extends Object {

        var $issues_history_srl = null;
        var $target_srl = null;
        var $module_srl = null;
        var $content = null;
        var $regdate = null;
        var $member_srl = null;
        var $nick_name = null;
        var $password = null;
        var $uploaded_count = null;

        function issueHistory($issues_history_srl = 0) {
            $this->issues_history_srl = $issues_history_srl;
        }

        function populate(&$obj)
        {
            $vars = get_object_vars($obj);
            foreach($vars as $k => $v)
            {
                $this->{$k} = $v;
            }

            if($this->history) $this->history = unserialize($this->history);
            if($this->history && count($this->history)) {
                $h = array();
                foreach($this->history as $key => $val) {
                    if($val[0]) $str = Context::getLang('history_format');
                    else $str = Context::getLang('history_format_not_source');
                    $str = str_replace('[source]', $val[0], $str);
                    $str = str_replace('[target]', $val[1], $str);
                    $str = str_replace('[key]', Context::getLang($key), $str);
                    $h[] = $str;
                }
                $this->history = $h;
            } else {
                $this->history = null;
            }
            preg_match_all('/r([0-9]+)/',$this->content, $mat);
            for($k=0;$k<count($mat[1]);$k++) {
                $this->content = str_replace('r'.$mat[1][$k], sprintf('<a href="%s" onclick="window.open(this.href); return false;">%s</a>',getUrl('','mid',Context::get('mid'),'act','dispIssuetrackerViewSource','type','compare','erev',$mat[1][$k],'brev',''), 'r'.$mat[1][$k]), $this->content);
            }
            preg_match_all('/\[([0-9]+)\]/',$this->content, $mat);
            for($k=0;$k<count($mat[1]);$k++) {
                $this->content = str_replace('['.$mat[1][$k].']', sprintf('<a href="%s" onclick="window.open(this.href); return false;">%s</a>',getUrl('','mid',Context::get('mid'),'act','dispIssuetrackerViewSource','type','compare','erev',$mat[1][$k],'brev',''), '['.$mat[1][$k].']'), $this->content);
           }
        }

        function hasUploadedFiles() {
            return $this->uploaded_count? true : false;
        }

        function getUploadedFiles() {
            if(!$this->uploaded_count) return;

            $oFileModel = &getModel('file');
            $file_list = $oFileModel->getFiles($this->issues_history_srl);
            return $file_list;
        }

    }
?>
